// src/estimater/estimater.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstimaterDto } from './dto/create-estimater.dto';
import { UpdateEstimaterDto } from './dto/update-estimater.dto';
import { Estimater } from 'src/entities/estimater.entity';

@Injectable()
export class EstimaterService {
  constructor(
    @InjectRepository(Estimater) // Inject the repository correctly
    private readonly estimaterRepository: Repository<Estimater>,
  ) {}

  async create(createEstimaterDto: CreateEstimaterDto): Promise<Estimater> {
    const newEstimation = this.estimaterRepository.create(createEstimaterDto);
    return await this.estimaterRepository.save(newEstimation);
  }

  async findAll(): Promise<Estimater[]> {
    return await this.estimaterRepository.find({
      order: {
        id: 'DESC',
      }
    });
  }

  async findOne(id: number): Promise<Estimater> {
    const estimation = await this.estimaterRepository.findOne({ where: { id } });
    if (!estimation) {
      throw new NotFoundException(`Estimation with ID ${id} not found`);
    }
    return estimation;
  }

  async update(id: number, updateEstimaterDto: UpdateEstimaterDto): Promise<Estimater> {
    await this.findOne(id); // Ensure the entity exists
    await this.estimaterRepository.update(id, updateEstimaterDto);
    return await this.findOne(id); // Return the updated entity
  }

  async remove(id: number): Promise<void> {
    const result = await this.estimaterRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Estimation with ID ${id} not found`);
    }
  }
}
