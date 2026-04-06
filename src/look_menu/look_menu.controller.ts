import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request, UseGuards } from '@nestjs/common';
import { LookMenuService } from './look_menu.service';
import { CreateLookMenuDto } from './dto/create-look_menu.dto';
import { UpdateLookMenuDto } from './dto/update-look_menu.dto';
import { AuthGuard } from '@nestjs/passport';
import { ensureCmsDeletePermission } from '../auth/utils/cms-access.util';

@Controller('look-menu')
export class LookMenuController {
  constructor(private readonly lookMenuService: LookMenuService) {}

  // ✅ Create a new entry
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createLookMenuDto: CreateLookMenuDto, @Request() req) {
    return this.lookMenuService.create(createLookMenuDto, req.user);
  }

  // ✅ Get all records (optional status filter via query param)
  @Get()
  findAll(@Query('status') status?: string) {
    console.log('Fetching look_menu data with status:', status);
    return this.lookMenuService.findAll(status);
  }

  // ✅ Get single record by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lookMenuService.findOne(+id);
  }

  // ✅ Update a record
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLookMenuDto: UpdateLookMenuDto, @Request() req) {
    return this.lookMenuService.update(+id, updateLookMenuDto, req.user);
  }

  // ✅ Delete a record
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    ensureCmsDeletePermission(req.user);
    return this.lookMenuService.remove(+id);
  }
}
