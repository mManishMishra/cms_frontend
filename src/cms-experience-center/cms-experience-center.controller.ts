import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CmsExperienceCenterService } from './cms-experience-center.service';
import { CreateCmsExperienceCenterDto } from './dto/create-cms-experience-center.dto';
import { UpdateCmsExperienceCenterDto } from './dto/update-cms-experience-center.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('cms-experience-center')
export class CmsExperienceCenterController {
  constructor(private readonly cmsExperienceCenterService: CmsExperienceCenterService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createCmsExperienceCenterDto: CreateCmsExperienceCenterDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('File is not uploaded');
    }
    const imagePath = file.path;
    return this.cmsExperienceCenterService.create(createCmsExperienceCenterDto, imagePath);
  }

  @Get()
  findAll() {
    return this.cmsExperienceCenterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cmsExperienceCenterService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @Body() updateCmsExperienceCenterDto: UpdateCmsExperienceCenterDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? file.path : null;
    return this.cmsExperienceCenterService.update(+id, updateCmsExperienceCenterDto, imagePath);
  }
}