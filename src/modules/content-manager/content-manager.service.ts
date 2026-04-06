import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContentManagerDto } from './dto/create-content-manager.dto';
import { UpdateContentManagerDto } from './dto/update-content-manager.dto';
import { ContentManager } from 'src/entities/content-manager.entity';

@Injectable()
export class ContentManagerService {
  constructor(
    @InjectRepository(ContentManager)
    private readonly contentManagerRepository: Repository<ContentManager>,
  ) {}

  async create(createContentManagerDto: CreateContentManagerDto): Promise<ContentManager> {
    const content = this.contentManagerRepository.create(createContentManagerDto);
    return await this.contentManagerRepository.save(content);
  }

  async findAll(): Promise<ContentManager[]> {
    return await this.contentManagerRepository.find();
  }

  async findOne(id: number): Promise<ContentManager> {
    const content = await this.contentManagerRepository.findOne({ where: { id } });
    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    return content;
  }

  async findBySlug(slug: string): Promise<ContentManager> {
    const content = await this.contentManagerRepository.findOne({ where: { slug } });
    if (!content) {
      throw new NotFoundException(`Content with slug ${slug} not found`);
    }
    return content;
  }

  async update(id: number, updateContentManagerDto: UpdateContentManagerDto): Promise<ContentManager> {
    const content = await this.contentManagerRepository.preload({
      id,
      ...updateContentManagerDto,
    });

    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    return await this.contentManagerRepository.save(content);
  }

  async remove(id: number): Promise<void> {
    const content = await this.findOne(id);
    await this.contentManagerRepository.remove(content);
  }
}
