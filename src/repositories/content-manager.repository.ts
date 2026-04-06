import { Repository } from 'typeorm';
import { ContentManager } from 'src/entities/content-manager.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContentManagerRepository {
  constructor(
    @InjectRepository(ContentManager) private readonly contentRepo: Repository<ContentManager>,
  ) {}

  async create(content: ContentManager): Promise<ContentManager> {
    return this.contentRepo.save(content);
  }

  async findAll(): Promise<ContentManager[]> {
    return this.contentRepo.find();
  }

  async findOne(id: number): Promise<ContentManager> {
    return this.contentRepo.findOne({ where: { id } });
  }

  async update(id: number, content: Partial<ContentManager>): Promise<void> {
    await this.contentRepo.update(id, content);
  }

  async delete(id: number): Promise<void> {
    await this.contentRepo.delete(id);
  }
}
