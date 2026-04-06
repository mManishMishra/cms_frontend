import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request, UseGuards } from '@nestjs/common';
import { FooterLinkService } from './footer_link.service';
import { CreateFooterLinkDto } from './dto/create-footer_link.dto';
import { UpdateFooterLinkDto } from './dto/update-footer_link.dto';
import { AuthGuard } from '@nestjs/passport';
import { ensureCmsDeletePermission } from '../auth/utils/cms-access.util';


@Controller('footer-link')
export class FooterLinkController {
 constructor(private readonly footerLinkService: FooterLinkService) {}

  // ✅ Create a new entry
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() CreateFooterLinkDto: CreateFooterLinkDto, @Request() req) {
    return this.footerLinkService.create(CreateFooterLinkDto, req.user);
  }

  // ✅ Get all records (optional status filter via query param)
  @Get()
  findAll(@Query('status') status?: string) {
    console.log('Fetching look_menu data with status:', status);
    return this.footerLinkService.findAll(status);
  }

  // ✅ Get single record by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.footerLinkService.findOne(+id);
  }

  // ✅ Update a record
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateFooterLinkDto: UpdateFooterLinkDto, @Request() req) {
    return this.footerLinkService.update(+id, UpdateFooterLinkDto, req.user);
  }

  // ✅ Delete a record
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    ensureCmsDeletePermission(req.user);
    return this.footerLinkService.remove(+id);
  }
}
