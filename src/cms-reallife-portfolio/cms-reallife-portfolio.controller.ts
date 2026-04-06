import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CmsReallifePortfolioService } from './cms-reallife-portfolio.service';
import { CreateCmsReallifePortfolioDto } from './dto/create-cms-reallife-portfolio.dto';
import { UpdateCmsReallifePortfolioDto } from './dto/update-cms-reallife-portfolio.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cms-reallife-portfolio')
export class CmsReallifePortfolioController {
  constructor(private readonly cmsReallifePortfolioService: CmsReallifePortfolioService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createCmsReallifePortfolioDto: CreateCmsReallifePortfolioDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('File is not uploaded');
    }
    const imagePath = file.path;
    return this.cmsReallifePortfolioService.create(createCmsReallifePortfolioDto, imagePath);
  }

  @Get()
  findAll() {
    return this.cmsReallifePortfolioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cmsReallifePortfolioService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateCmsReallifePortfolioDto: UpdateCmsReallifePortfolioDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? file.path : null;
    return this.cmsReallifePortfolioService.update(+id, updateCmsReallifePortfolioDto, imagePath);
  }

}
