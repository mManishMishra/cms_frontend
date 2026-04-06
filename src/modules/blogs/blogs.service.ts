import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from 'src/entities/blogs.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  // Create a new blog
  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const blog = this.blogRepository.create(createBlogDto);
    return await this.blogRepository.save(blog);
  }

  // Retrieve all blogs
  async findAll(): Promise<Blog[]> {
    return await this.blogRepository.find({
      order: { createdAt: 'DESC' }, // Optional: Order by latest
    });
  }

  // Retrieve a specific blog by ID
  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  // Update a blog by ID
  async update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogRepository.preload({
      id,
      ...updateBlogDto,
    });

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return await this.blogRepository.save(blog);
  }

  // Remove a blog by ID
  async remove(id: number): Promise<void> {
    const blog = await this.findOne(id);
    await this.blogRepository.remove(blog);
  }
}
