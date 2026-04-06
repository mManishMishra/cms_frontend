import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    try {
      const blog = await this.blogsService.create(createBlogDto);
      return blog;
    } catch (error) {
      throw new HttpException('Failed to create blog', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    return await this.blogsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const blog = await this.blogsService.findOne(+id);
    if (!blog) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }
    return blog;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    try {
      return await this.blogsService.update(+id, updateBlogDto);
    } catch (error) {
      throw new HttpException('Failed to update blog', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.blogsService.remove(+id);
    } catch (error) {
      throw new HttpException('Failed to delete blog', HttpStatus.BAD_REQUEST);
    }
  }
}
