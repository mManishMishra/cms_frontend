import { Injectable } from '@nestjs/common';
import { CreateManageJobDto } from './dto/create-manage_job.dto';
import { UpdateManageJobDto } from './dto/update-manage_job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ManageJob } from './entities/manage_job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManageJobService {
  constructor(
    @InjectRepository(ManageJob)
    private readonly manageJobRepository: Repository<ManageJob>,
  ) {}
  
  create(createManageJobDto: CreateManageJobDto) {
    return this.manageJobRepository.save(createManageJobDto);
  }

  findAll(status?: string) {
    if (status) {
      return this.manageJobRepository.find({ where: { status }, order: { id: 'DESC' } });
    }
    return this.manageJobRepository.find({ order: { id: 'DESC' } });
  }

  findOne(id: number) {
    return this.manageJobRepository.findOne({ where: { id } });
  }

  update(id: number, updateManageJobDto: UpdateManageJobDto) {
    return this.manageJobRepository.update(id, updateManageJobDto);
  }

  remove(id: number) {
    return this.manageJobRepository.softDelete(id);
  }
}
