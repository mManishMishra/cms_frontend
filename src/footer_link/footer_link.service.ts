import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FooterLink } from './entities/footer_link.entity';
import { CreateFooterLinkDto } from './dto/create-footer_link.dto';
import { UpdateFooterLinkDto } from './dto/update-footer_link.dto';
import { resolveActiveStatus } from '../auth/utils/cms-access.util';

@Injectable()
export class FooterLinkService {

 constructor(
    @InjectRepository(FooterLink)
    private readonly footerLinkRepository: Repository<FooterLink>,
  ) {}

  // ✅ Create a new LookMenu record
  async create(CreateFooterLinkDto: CreateFooterLinkDto, user?: any): Promise<FooterLink> {
    const lookMenu = this.footerLinkRepository.create({
      ...CreateFooterLinkDto,
      status: resolveActiveStatus((CreateFooterLinkDto as any)?.status || 'inactive', user),
    });
    return await this.footerLinkRepository.save(lookMenu);
  }

  // ✅ Find all records (optional filter by status)
  async findAll(status?: string): Promise<FooterLink[]> {
    const whereCondition = status ? { status } : {};
    return await this.footerLinkRepository.find({
      where: whereCondition,
      order: { id: 'DESC' },
    });
  }

  // ✅ Find a single record by ID
  async findOne(id: number): Promise<FooterLink> {
    const record = await this.footerLinkRepository.findOne({ where: { id } });
    if (!record) throw new NotFoundException(`LookMenu with ID ${id} not found`);
    return record;
  }

  // ✅ Update a record and return updated data
  async update(id: number, updateLookMenuDto: UpdateFooterLinkDto, user?: any): Promise<FooterLink> {
    const record = await this.findOne(id);
    Object.assign(record, {
      ...updateLookMenuDto,
      status:
        (updateLookMenuDto as any)?.status !== undefined
          ? resolveActiveStatus((updateLookMenuDto as any)?.status, user)
          : record.status,
    });
    return await this.footerLinkRepository.save(record);
  }

  // ✅ Soft delete a record (marks as deleted but keeps it in DB)
  async remove(id: number): Promise<void> {
    const record = await this.findOne(id);
    await this.footerLinkRepository.softDelete(id);
  }




}
