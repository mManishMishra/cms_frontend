import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeoTag } from './entities/seo_tag.entity';
import { CreateSeoTagDto } from './dto/create-seo_tag.dto';
import { UpdateSeoTagDto } from './dto/update-seo_tag.dto';
import { resolveActiveStatus } from '../auth/utils/cms-access.util';
@Injectable()
export class SeoTagService {

constructor(
    @InjectRepository(SeoTag)
    private readonly seoTagRepository: Repository<SeoTag>,
  ) {}

  // ✅ Create a new LookMenu record
  async create(CreateSeoTagDto: CreateSeoTagDto, user?: any): Promise<SeoTag> {
    const lookMenu = this.seoTagRepository.create({
      ...CreateSeoTagDto,
      status: resolveActiveStatus(CreateSeoTagDto?.status || 'inactive', user),
    });
    return await this.seoTagRepository.save(lookMenu);
  }

  // ✅ Find all records (optional filter by status)
  async findAll(status?: string): Promise<SeoTag[]> {
    const whereCondition = status ? { status } : {};
    return await this.seoTagRepository.find({
      where: whereCondition,
      order: { id: 'DESC' },
    });
  }

  // ✅ Find a single record by ID
  async findOne(id: number): Promise<SeoTag> {
    const record = await this.seoTagRepository.findOne({ where: { id } });
    if (!record) throw new NotFoundException(`LookMenu with ID ${id} not found`);
    return record;
  }

  // ✅ Update a record and return updated data
  async update(id: number, updateSeoTagDto: UpdateSeoTagDto, user?: any): Promise<SeoTag> {
    const record = await this.findOne(id);
    Object.assign(record, {
      ...updateSeoTagDto,
      status:
        updateSeoTagDto?.status !== undefined
          ? resolveActiveStatus(updateSeoTagDto.status, user)
          : record.status,
    });
    return await this.seoTagRepository.save(record);
  }

  // ✅ Soft delete a record (marks as deleted but keeps it in DB)
  async remove(id: number): Promise<void> {
    const record = await this.findOne(id);
    await this.seoTagRepository.softDelete(id);
  }





}
