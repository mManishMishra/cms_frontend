import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, ParseIntPipe, Request, UseGuards } from '@nestjs/common';
import { CmsContentService } from './cms_content.service';
import { CreateCmsContentDto } from './dto/create-cms_content.dto';
import { UpdateCmsContentDto, UpdateJsonContentChildImageDto } from './dto/update-cms_content.dto';
import { PageType } from './entities/cms_content.entity';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ensureCmsDeletePermission } from '../auth/utils/cms-access.util';

@Controller('cms-content')
export class CmsContentController {
  constructor(private readonly cmsContentService: CmsContentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':page_type')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Param('page_type') page_type: PageType,
    @Body() createCmsContentDto: CreateCmsContentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? file.path : null;
    return this.cmsContentService.create(page_type, createCmsContentDto, imagePath);
  }

  @Get()
  findAll() {
    return this.cmsContentService.findAll();
  }

  @Get(':page_type')
  findOne(@Param('page_type') page_type: PageType) {
    return this.cmsContentService.findOne(page_type);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCmsContentDto: UpdateCmsContentDto) {
    return this.cmsContentService.update(+id, updateCmsContentDto);
}

  @UseGuards(AuthGuard('jwt'))
  @Patch('update-with-image/:id')
  @UseInterceptors(FileInterceptor('json_content[mid_image]'))
  async updateWithImage(
    @Param('id') id: number,
    @Body() updateCmsContentDto: UpdateCmsContentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? file.path : null;
    return this.cmsContentService.updateWithImage(+id, updateCmsContentDto, imagePath);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update-json-child-image/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateJsonChildImage(
    @Param('id') id: number,
    @Body() updateCmsContentDto: UpdateJsonContentChildImageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file ? file?.path : null;
    return this.cmsContentService.updateJsonContentChildImage(+id, updateCmsContentDto, imagePath);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update-json-homepage-banner/:id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'top_icon', maxCount: 1 },
    { name: 'banner_image', maxCount: 1 },
  ]))
  async uploadFile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCmsContentDto: UpdateJsonContentChildImageDto,
    @UploadedFiles() files: { banner_image?: Express.Multer.File[], top_icon?: Express.Multer.File[] },
  ) {
    const topIconPath = files.top_icon ? files.top_icon[0].filename : null;
    const bannerImagePath = files.banner_image ? files.banner_image[0].filename : null;

    return this.cmsContentService.updateJsonContentHomepageBanner(id, updateCmsContentDto, topIconPath, bannerImagePath);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    ensureCmsDeletePermission(req.user);
    return this.cmsContentService.remove(+id);
  }
}
