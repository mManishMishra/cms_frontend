import { Injectable } from '@nestjs/common';
import { CreateCmsGalleryDesignDto } from './dto/create-cms-gallery-design.dto';
import { UpdateCmsGalleryDesignDto } from './dto/update-cms-gallery-design.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CmsGalleryDesign } from './entities/cms-gallery-design.entity';
import { Repository } from 'typeorm';
import { basename } from 'path';

@Injectable()
export class CmsGalleryDesignService {

  constructor(
    @InjectRepository(CmsGalleryDesign)
    private readonly cmsGalleryDesignRepository: Repository<CmsGalleryDesign>,
  ) {}




  async create(createCmsGalleryDesignDto: CreateCmsGalleryDesignDto, imagePath: string): Promise<CmsGalleryDesign> {
    const imageName = basename(imagePath); // Extract the filename from the path
    const newRecord = this.cmsGalleryDesignRepository.create({
      ...createCmsGalleryDesignDto,
      image: imageName,
    });
    return await this.cmsGalleryDesignRepository.save(newRecord);
  }

  async findAll() {
    const baseUrl = `${process.env.BASE_URL}/uploads/design-gallery/`;
    const designs = await this.cmsGalleryDesignRepository.find();

    return designs.map(design => ({
      ...design,
      image: design.image ? `${baseUrl}${design.image}` : null,
    }));
  }


  async update(id: number, updateCmsGalleryDesignDto: UpdateCmsGalleryDesignDto, imagePath: string | null) {
    const existingRecord = await this.cmsGalleryDesignRepository.findOne({ where: { id } });
    if (!existingRecord) {
      throw new Error('Record not found');
    }

    if (imagePath) {
      const imageName = basename(imagePath); // Extract the filename from the path
      updateCmsGalleryDesignDto.image = imageName;
    }

    await this.cmsGalleryDesignRepository.update(id, updateCmsGalleryDesignDto);
    return this.cmsGalleryDesignRepository.findOne({ where: { id } });
  }

}
