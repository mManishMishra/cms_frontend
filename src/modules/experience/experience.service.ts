// src/experience/experience.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { ExperienceInquiry } from 'src/entities/experience.entity';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(ExperienceInquiry)
    private readonly experienceRepository: Repository<ExperienceInquiry>,
  ) {}

  // Create a new inquiry
  async create(createExperienceDto: CreateExperienceDto): Promise<ExperienceInquiry> {
    const inquiry = this.experienceRepository.create(createExperienceDto);
    return this.experienceRepository.save(inquiry);
  }

  // Get all inquiries (optional)
  async findAll(): Promise<ExperienceInquiry[]> {
    return this.experienceRepository.find();
  }

  // Find one inquiry by id (optional)
  async findOne(id: number): Promise<ExperienceInquiry> {
    const inquiry = await this.experienceRepository.findOne({ where: { id } });
    if (!inquiry) {
      throw new NotFoundException(`Inquiry with ID ${id} not found`);
    }
    return inquiry;
  }
}
