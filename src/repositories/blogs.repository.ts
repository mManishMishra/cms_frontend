import { Repository } from 'typeorm';
import { Blog } from 'src/entities/blogs.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlogRepository {
  constructor(
    @InjectRepository(Blog) private blogRepo: Repository<Blog>,
  ) {}

  async create(blog: Blog): Promise<Blog> {
    return this.blogRepo.save(blog);
  }

  async findAll(): Promise<Blog[]> {
    return this.blogRepo.find();
  }

  async findOne(id: number): Promise<Blog> {
    return this.blogRepo.findOne({ where: { id } });
  }

  async update(id: number, blog: Partial<Blog>): Promise<void> {
    await this.blogRepo.update(id, blog);
  }

  async delete(id: number): Promise<void> {
    await this.blogRepo.delete(id);
  }
}
