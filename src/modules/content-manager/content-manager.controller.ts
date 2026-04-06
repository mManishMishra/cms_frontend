import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ContentManagerService } from './content-manager.service';
import { CreateContentManagerDto } from './dto/create-content-manager.dto';
import { UpdateContentManagerDto } from './dto/update-content-manager.dto';
import { QueryFailedError } from 'typeorm';

@Controller('content-manager')
export class ContentManagerController {
  constructor(private readonly contentManagerService: ContentManagerService) {}

  @Post()
  async create(@Body() createContentManagerDto: CreateContentManagerDto) {
    try {
      return await this.contentManagerService.create(createContentManagerDto);
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('Duplicate entry')) {
        throw new HttpException('Slug already exists', HttpStatus.CONFLICT);
      }
      throw new HttpException('Failed to create content', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    return await this.contentManagerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const content = await this.contentManagerService.findOne(+id);
    if (!content) {
      throw new HttpException('Content not found', HttpStatus.NOT_FOUND);
    }
    return content;
  }

  //find by slug
  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    const content = await this.contentManagerService.findBySlug(slug);
    if (!content) {
      throw new HttpException('Content not found', HttpStatus.NOT_FOUND);
    }
    return content;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateContentManagerDto: UpdateContentManagerDto) {
    try {
      return await this.contentManagerService.update(+id, updateContentManagerDto);
    } catch (error) {
      throw new HttpException('Failed to update content', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.contentManagerService.remove(+id);
    } catch (error) {
      throw new HttpException('Failed to delete content', HttpStatus.BAD_REQUEST);
    }
  }
}
