import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CmsProductService } from './cms-product.service';
import { CreateCmsProductDto } from './dto/create-cms-product.dto';
import { UpdateCmsProductDto } from './dto/update-cms-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cms-product')
export class CmsProductController {
  constructor(private readonly cmsProductService: CmsProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createCmsProductDto: CreateCmsProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('File is not uploaded');
    }
    const imagePath = file.path;
    return this.cmsProductService.create(createCmsProductDto, imagePath);
  }

  @Get()
  findAll() {
    return this.cmsProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cmsProductService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @Body() updateCmsProductDto: UpdateCmsProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? file.path : null;
    return this.cmsProductService.update(+id, updateCmsProductDto, imagePath);
  }

}
