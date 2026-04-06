import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request, UseGuards } from '@nestjs/common';
import { SeoTagService } from './seo_tag.service';
import { CreateSeoTagDto } from './dto/create-seo_tag.dto';
import { UpdateSeoTagDto } from './dto/update-seo_tag.dto';
import { AuthGuard } from '@nestjs/passport';
import { ensureCmsDeletePermission } from '../auth/utils/cms-access.util';

@Controller('seo-tag')
export class SeoTagController {
constructor(private readonly seoTagService: SeoTagService) {}
// ✅ Create a new entry
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() CreateSeoTagDto: CreateSeoTagDto, @Request() req) {
    return this.seoTagService.create(CreateSeoTagDto, req.user);
  }

  // ✅ Get all records (optional status filter via query param)
  @Get()
  findAll(@Query('status') status?: string) {
    console.log('Fetching look_menu data with status:', status);
    return this.seoTagService.findAll(status);
  }

  // ✅ Get single record by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seoTagService.findOne(+id);
  }

  // ✅ Update a record
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateSeoTagDto: UpdateSeoTagDto, @Request() req) {
    return this.seoTagService.update(+id, UpdateSeoTagDto, req.user);
  }

  // ✅ Delete a record
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    ensureCmsDeletePermission(req.user);
    return this.seoTagService.remove(+id);
  }


}
