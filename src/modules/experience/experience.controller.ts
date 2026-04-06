// src/experience/experience.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { ExperienceInquiry } from 'src/entities/experience.entity';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  async create(@Body() createExperienceDto: CreateExperienceDto): Promise<ExperienceInquiry> {
    return this.experienceService.create(createExperienceDto);
  }

  @Get()
  async findAll(): Promise<ExperienceInquiry[]> {
    return this.experienceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ExperienceInquiry> {
    return this.experienceService.findOne(id);
  }
}
