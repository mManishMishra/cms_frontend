import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CmsGalleryDesignService } from './cms-gallery-design.service';
import { CreateCmsGalleryDesignDto } from './dto/create-cms-gallery-design.dto';
import { UpdateCmsGalleryDesignDto } from './dto/update-cms-gallery-design.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cms-gallery-design')
export class CmsGalleryDesignController {
  constructor(private readonly cmsGalleryDesignService: CmsGalleryDesignService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createCmsGalleryDesignDto: CreateCmsGalleryDesignDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('File is not uploaded');
    }
    const imagePath = file.path;
    return this.cmsGalleryDesignService.create(createCmsGalleryDesignDto, imagePath);
  }

  @Get()
  findAll() {
    return this.cmsGalleryDesignService.findAll();
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @Body() updateCmsGalleryDesignDto: UpdateCmsGalleryDesignDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? file.path : null;
    return this.cmsGalleryDesignService.update(+id, updateCmsGalleryDesignDto, imagePath);
  }

}
