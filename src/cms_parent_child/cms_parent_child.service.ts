import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCmsParentChildDto } from './dto/create-cms_parent_child.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CmsParentChild, PageType } from './entities/cms_parent_child.entity';
import { Repository } from 'typeorm';
import { MediaAsset } from './entities/media-asset.entity';
import { basename, extname } from 'path';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CmsParentChildService {
  private readonly mediaFolder = 'parent-child';

  constructor(
    @InjectRepository(CmsParentChild)
    private readonly cmsParentChildRepository: Repository<CmsParentChild>,
    @InjectRepository(MediaAsset)
    private readonly mediaAssetRepository: Repository<MediaAsset>,
  ) {}

  private getUploadDir(folder = this.mediaFolder) {
    const candidates = [
      path.join(process.cwd(), 'uploads', folder),
      path.resolve(__dirname, '..', '..', 'uploads', folder),
      path.resolve(process.cwd(), 'backend', 'uploads', folder),
    ];

    const existingDir = candidates.find((dir) => fs.existsSync(dir));
    return existingDir || candidates[0];
  }

  private ensureUploadDir(folder = this.mediaFolder) {
    const uploadDir = this.getUploadDir(folder);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    return uploadDir;
  }

  private getBaseUrl() {
    return (process.env.BASE_URL || 'http://localhost:8000').replace(/\/$/, '');
  }

  private buildMediaUrl(filename: string, folder = this.mediaFolder) {
    return `${this.getBaseUrl()}/uploads/${folder}/${filename}`;
  }

  private createFallbackAltText(filename: string) {
    const rawName = basename(filename, extname(filename));

    return rawName
      .replace(/[-_]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim() || 'Website image';
  }

  private guessMimeType(filename: string) {
    const extension = extname(filename).toLowerCase();

    if (extension === '.png') return 'image/png';
    if (extension === '.jpg' || extension === '.jpeg') return 'image/jpeg';
    if (extension === '.webp') return 'image/webp';
    if (extension === '.gif') return 'image/gif';
    if (extension === '.svg') return 'image/svg+xml';
    if (extension === '.avif') return 'image/avif';

    return 'application/octet-stream';
  }

  private cleanupTempFile(file?: Express.Multer.File | null) {
    if (file?.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  }

  private formatMediaResponse(
    filename: string,
    asset?: MediaAsset | null,
    fileStats?: fs.Stats,
    folder = this.mediaFolder,
  ) {
    return {
      id: asset?.id ?? null,
      filename,
      folder,
      url: this.buildMediaUrl(filename, folder),
      alt_text: asset?.alt_text || this.createFallbackAltText(filename),
      original_name: asset?.original_name || filename,
      mime_type: asset?.mime_type || this.guessMimeType(filename),
      size_bytes: asset?.size_bytes ?? fileStats?.size ?? 0,
      created_at: asset?.created_at ?? fileStats?.birthtime ?? new Date(),
      updated_at: asset?.updated_at ?? fileStats?.mtime ?? new Date(),
    };
  }

  private async upsertMediaAsset(params: {
    filename: string;
    folder?: string;
    altText?: string | null;
    originalName?: string | null;
    mimeType?: string | null;
    sizeBytes?: number | null;
  }) {
    const folder = params.folder || this.mediaFolder;
    const existingAsset = await this.mediaAssetRepository.findOne({
      where: {
        filename: params.filename,
        folder,
      },
    });

    const targetAsset = existingAsset || this.mediaAssetRepository.create({
      filename: params.filename,
      folder,
    });

    if (params.altText !== undefined) {
      const trimmedAlt = params.altText?.trim();
      targetAsset.alt_text = trimmedAlt || this.createFallbackAltText(params.filename);
    } else if (!targetAsset.alt_text) {
      targetAsset.alt_text = this.createFallbackAltText(params.filename);
    }

    if (params.originalName !== undefined) {
      targetAsset.original_name = params.originalName || params.filename;
    } else if (!targetAsset.original_name) {
      targetAsset.original_name = params.filename;
    }

    if (params.mimeType !== undefined) {
      targetAsset.mime_type = params.mimeType || this.guessMimeType(params.filename);
    } else if (!targetAsset.mime_type) {
      targetAsset.mime_type = this.guessMimeType(params.filename);
    }

    if (params.sizeBytes !== undefined && params.sizeBytes !== null) {
      targetAsset.size_bytes = params.sizeBytes;
    } else if (!targetAsset.size_bytes) {
      const filePath = path.join(this.ensureUploadDir(folder), params.filename);
      if (fs.existsSync(filePath)) {
        targetAsset.size_bytes = fs.statSync(filePath).size;
      }
    }

    return this.mediaAssetRepository.save(targetAsset);
  }

  async uploadMedia(file: Express.Multer.File, altText: string) {
    const trimmedAltText = altText?.trim();

    if (!trimmedAltText) {
      this.cleanupTempFile(file);
      throw new BadRequestException('Alt text is mandatory for uploaded images');
    }

    const mediaAsset = await this.upsertMediaAsset({
      filename: file.filename,
      altText: trimmedAltText,
      originalName: file.originalname,
      mimeType: file.mimetype,
      sizeBytes: file.size,
    });

    return this.formatMediaResponse(file.filename, mediaAsset);
  }


  // --- MAGIC CLONING SCRIPT: Gurugram to Faridabad ---
  // async duplicateGurugramToFaridabad() {
  //   // 1. Fetch all existing Gurugram records (Pages and Videos)
  //   const gurugramPages = await this.cmsParentChildRepository.find({ 
  //     where: { page_type: PageType.EXPERIENCE_CENTER_GURUGRAM } 
  //   });
  //   const gurugramVideos = await this.cmsParentChildRepository.find({ 
  //     where: { page_type: PageType.EXPERIENCE_CENTER_GURUGRAM_VIDEO } 
  //   });

  //   if (gurugramPages.length === 0 && gurugramVideos.length === 0) {
  //     return { message: "No Gurugram records found to copy!" };
  //   }

  //   // 2. Clone the pages, stripping the old IDs and changing the page_type
  //   const newFaridabadPages = gurugramPages.map(record => {
  //     return this.cmsParentChildRepository.create({
  //       page_type: PageType.EXPERIENCE_CENTER_FARIDABAD,
  //       child_content: record.child_content,
  //       child_images: record.child_images
  //     });
  //   });

  //   // 3. Clone the videos
  //   const newFaridabadVideos = gurugramVideos.map(record => {
  //     return this.cmsParentChildRepository.create({
  //       page_type: PageType.EXPERIENCE_CENTER_FARIDABAD_VIDEO,
  //       child_content: record.child_content,
  //       child_images: record.child_images
  //     });
  //   });

  //   // 4. Save everything to the database as brand new Faridabad records
  //   await this.cmsParentChildRepository.save([...newFaridabadPages, ...newFaridabadVideos]);

  //   return { 
  //     message: "Success! Gurugram data has been fully cloned to Faridabad.",
  //     pagesCopied: newFaridabadPages.length,
  //     videosCopied: newFaridabadVideos.length
  //   };
  // }

  // --- FIXED: Retrieve all images for Media Library ---
  async getAllMedia() {
    const uploadDir = this.ensureUploadDir();
    const mediaAssets = await this.mediaAssetRepository.find({
      where: { folder: this.mediaFolder },
      order: { updated_at: 'DESC' },
    });
    const mediaAssetMap = new Map(
      mediaAssets.map((asset) => [asset.filename, asset]),
    );

    try {
      const files = fs
        .readdirSync(uploadDir)
        .filter((file) => file !== '.gitkeep' && !file.startsWith('.'));

      return files
        .map((file) => {
          const stats = fs.statSync(path.join(uploadDir, file));
          return this.formatMediaResponse(file, mediaAssetMap.get(file), stats);
        })
        .sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        );
    } catch (err) {
      console.error('Error reading media directory:', err);
      return [];
    }
  }

  async updateMediaAlt(targetFilename: string, altText: string) {
    const trimmedAltText = altText?.trim();

    if (!trimmedAltText) {
      throw new BadRequestException('Alt text is mandatory');
    }

    const uploadDir = this.ensureUploadDir();
    const targetPath = path.join(uploadDir, targetFilename);

    if (!fs.existsSync(targetPath)) {
      throw new NotFoundException('Image not found');
    }

    const fileStats = fs.statSync(targetPath);
    const asset = await this.upsertMediaAsset({
      filename: targetFilename,
      altText: trimmedAltText,
      originalName: targetFilename,
      mimeType: this.guessMimeType(targetFilename),
      sizeBytes: fileStats.size,
    });

    return {
      message: 'Alt text updated successfully.',
      media: this.formatMediaResponse(targetFilename, asset, fileStats),
    };
  }

  // --- Replace image without URL change ---
  async replaceExistingImage(
    targetFilename: string,
    newFile: Express.Multer.File,
    altText?: string,
  ) {
    const uploadDir = this.ensureUploadDir();
    const targetPath = path.join(uploadDir, targetFilename);
    const targetExtension = extname(targetFilename).toLowerCase();
    const newFileExtension = extname(newFile.originalname).toLowerCase();

    if (!fs.existsSync(targetPath)) {
      this.cleanupTempFile(newFile);
      throw new NotFoundException('Image not found');
    }

    if (targetExtension && newFileExtension && targetExtension !== newFileExtension) {
      this.cleanupTempFile(newFile);
      throw new BadRequestException(
        `Replacement image must use the same file format (${targetExtension}) to preserve the existing URL safely.`,
      );
    }

    fs.copyFileSync(newFile.path, targetPath);
    this.cleanupTempFile(newFile);

    const existingAsset = await this.mediaAssetRepository.findOne({
      where: {
        filename: targetFilename,
        folder: this.mediaFolder,
      },
    });
    const fileStats = fs.statSync(targetPath);
    const asset = await this.upsertMediaAsset({
      filename: targetFilename,
      altText:
        altText !== undefined
          ? altText
          : existingAsset?.alt_text || this.createFallbackAltText(targetFilename),
      originalName: newFile.originalname,
      mimeType: newFile.mimetype || this.guessMimeType(targetFilename),
      sizeBytes: fileStats.size,
    });

    return { 
      message: 'Image successfully replaced. Existing URL remains active.',
      media: this.formatMediaResponse(targetFilename, asset, fileStats),
    };
  }
  
  async create(createCmsParentChildDto: CreateCmsParentChildDto): Promise<CmsParentChild> {
    const imagePath = createCmsParentChildDto.image ? basename(createCmsParentChildDto.image) : 'default.png';

    const defaultImageCount = 
      createCmsParentChildDto.page_type === 'experience_center' || 
      createCmsParentChildDto.page_type === 'experience_center_gurugram' 
        ? 3 
        : 10;

    const childImages = Array.from({ length: defaultImageCount }, () => ({ image: 'default.png' }));

    const createData = {
      page_type: createCmsParentChildDto.page_type,
      child_content: {
        title: createCmsParentChildDto.title,
        description: createCmsParentChildDto.description,
        image: imagePath,
      },
      child_images: childImages, 
    };

    try {
      const result = await this.cmsParentChildRepository.save(createData);
      return result;
    } catch (error) {
      console.error('Error Saving Data:', error);
      throw error;
    }
  }

  findAll() {
    return this.cmsParentChildRepository.find();
  }

  async findById(id: number) {
    const parentChild = await this.cmsParentChildRepository.findOne({ where: { id } });
    if (!parentChild) {
      return null;
    }
    const baseUrl = `${process.env.BASE_URL}/uploads/parent-child/`;

    const updatedChildContent = {
      title: parentChild.child_content.title,
      description: parentChild.child_content.description,
      image: parentChild.child_content.image ? `${baseUrl}${parentChild.child_content.image}` : null,
    };

    const updatedChildImages = parentChild.child_images.map(imageObj => ({
      ...imageObj,
      image: imageObj.image ? `${baseUrl}${imageObj.image}` : null,
    }));

    return {
      ...parentChild,
      child_content: updatedChildContent,
      child_images: updatedChildImages,
    };
  }

  async findAllByPageType(page_type: PageType) {
    const parentChildRecords = await this.cmsParentChildRepository.find({ where: { page_type }, order: { id: 'DESC' } });
    if (!parentChildRecords.length) {
      return [];
    }
    const baseUrl = `${process.env.BASE_URL}/uploads/parent-child/`;

    return parentChildRecords.map(parentChild => {
      const updatedChildContent = {
        ...parentChild.child_content,
        image: parentChild.child_content.image ? `${baseUrl}${parentChild.child_content.image}` : null,
      };

      const updatedChildImages = parentChild.child_images.map(imageObj => {
        const updatedImageObj = {};
        for (const key in imageObj) {
          if (imageObj.hasOwnProperty(key)) {
            updatedImageObj[key] = imageObj[key] ? `${baseUrl}${imageObj[key]}` : null;
          }
        }
        return updatedImageObj;
      });

      return {
        ...parentChild,
        child_content: updatedChildContent,
        child_images: updatedChildImages,
      };
    });
  }

  async update(id: number, updateData: { title: string; description: string; image?: string }) {
    const existingRecord = await this.cmsParentChildRepository.findOne({ where: { id } });
    if (!existingRecord) {
      throw new Error('Record not found');
    }

    const childContent = existingRecord.child_content;

    if (updateData.image) {
      const imageName = basename(updateData.image); 
      childContent.image = imageName;
    }

    childContent.title = updateData?.title;
    childContent.description = updateData.description;

    existingRecord.child_content = childContent;

    await this.cmsParentChildRepository.save(existingRecord);
    return this.cmsParentChildRepository.findOne({ where: { id } });
  }

  async updateChildImage(id: number, childImageIndex: number, imagePath: string | null) {
    const existingRecord = await this.cmsParentChildRepository.findOne({ where: { id } });
    if (!existingRecord) {
      throw new Error('Record not found');
    }

    if (childImageIndex < 0 || childImageIndex >= existingRecord.child_images.length) {
      throw new Error('Invalid child image index');
    }

    const childImages = existingRecord.child_images[childImageIndex];

    if (imagePath) {
      const imageName = basename(imagePath); 
      childImages.image = imageName;
    }

    existingRecord.child_images[childImageIndex] = childImages;

    await this.cmsParentChildRepository.save(existingRecord);
    return this.cmsParentChildRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.cmsParentChildRepository.delete(id);
  }
}
