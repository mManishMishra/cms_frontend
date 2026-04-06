import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, Request, UseGuards } from '@nestjs/common';
import { CmsParentChildService } from './cms_parent_child.service';
import { CreateCmsParentChildDto } from './dto/create-cms_parent_child.dto';
import { UpdateCmsParentChildDto } from './dto/update-cms_parent_child.dto';
import { PageType } from './entities/cms_parent_child.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ensureCmsDeletePermission } from '../auth/utils/cms-access.util';

@Controller('cms-parent-child')
export class CmsParentChildController {
  constructor(private readonly cmsParentChildService: CmsParentChildService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  uploadImageOnly(
    @UploadedFile() file: Express.Multer.File,
    @Body('alt_text') altText: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return this.cmsParentChildService.uploadMedia(file, altText);
  }

  //  @Get('clone-gurugram-to-faridabad')
  // cloneData() {
  //   return this.cmsParentChildService.duplicateGurugramToFaridabad();
  // }
  // --- NEW: Media Library Endpoint ---
  @Get('media-library')
  getMediaLibrary() {
    return this.cmsParentChildService.getAllMedia();
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('media-library/:filename/alt')
  updateMediaAlt(
    @Param('filename') targetFilename: string,
    @Body('alt_text') altText: string,
  ) {
    return this.cmsParentChildService.updateMediaAlt(targetFilename, altText);
  }

  // --- NEW: Image Replacement Without URL Change ---
  @UseGuards(AuthGuard('jwt'))
  @Post('replace-image/:filename')
  @UseInterceptors(FileInterceptor('image'))
  replaceImage(
    @Param('filename') targetFilename: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('alt_text') altText?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No new file uploaded for replacement');
    }
    return this.cmsParentChildService.replaceExistingImage(targetFilename, file, altText);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createCmsParentChildDto: CreateCmsParentChildDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? file.path : null;
    const createData = {
      page_type: createCmsParentChildDto.page_type,
      title: createCmsParentChildDto.title,
      description: createCmsParentChildDto.description,
      image: imagePath,
    };
    return this.cmsParentChildService.create(createData);
  }

  @Get()
  findAll() {
    return this.cmsParentChildService.findAll();
  }

  @Get(':page_type')
  findOne(@Param('page_type') page_type: PageType) {
    return this.cmsParentChildService.findAllByPageType(page_type);
  }

  @Get('by-id/:id')
  findById(@Param('id') id: string) {
    return this.cmsParentChildService.findById(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateCmsParentChildDto: UpdateCmsParentChildDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? file.path : null;
    const childContentIndex = updateCmsParentChildDto.childContentIndex;
    const updateData = {
      title: updateCmsParentChildDto.title,
      description: updateCmsParentChildDto.description,
      image: imagePath,
    };
    return this.cmsParentChildService.update(+id, updateData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update-child-image/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateChildImage(
    @Param('id') id: string,
    @Body('childImageIndex') childImageIndex: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? file.path : null;
    return this.cmsParentChildService.updateChildImage(+id, childImageIndex, imagePath);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    ensureCmsDeletePermission(req.user);
    return this.cmsParentChildService.remove(+id);
  }

  // --- MAGIC CLONE ENDPOINT ---
 
}
