import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseIntPipe, UploadedFile, Request, UseGuards } from '@nestjs/common';
import { CmsBlogService } from './cms_blog.service';
import { CreateCmsBlogDto } from './dto/create-cms_blog.dto';
import { UpdateCmsBlogDto } from './dto/update-cms_blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ensureCmsDeletePermission } from '../auth/utils/cms-access.util';

@Controller('cms-blog')
export class CmsBlogController {
  constructor(private readonly cmsBlogService: CmsBlogService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createCmsBlogDto: CreateCmsBlogDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const image = file ? file.filename : null;

    return this.cmsBlogService.create(createCmsBlogDto, image, req.user);
  }

  @Get()
  findAll() {
    return this.cmsBlogService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  findAllForCms() {
    return this.cmsBlogService.findAllForCms();
  }

  @Get('route-list')
  findAllRouteList() {
    return this.cmsBlogService.findAllRouteList();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cmsBlogService.findOne(+id);
  }

  @Get('blog-slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.cmsBlogService.findOneBySlug(slug);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCmsBlogDto: UpdateCmsBlogDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const image = file ? file.filename : null;
  
    return this.cmsBlogService.update(id, updateCmsBlogDto, image, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('seo-content/:id')
  async updateSeoContent(
    @Param('id', ParseIntPipe) id: number,
    @Body() seo_content: any,
    @Request() req,
  ) {
    return this.cmsBlogService.updateSeoContent(id, seo_content, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    ensureCmsDeletePermission(req.user);
    return this.cmsBlogService.remove(+id);
  }
}
