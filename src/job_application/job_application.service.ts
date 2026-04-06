import { Injectable } from '@nestjs/common';
import { CreateJobApplicationDto } from './dto/create-job_application.dto';
import { UpdateJobApplicationDto } from './dto/update-job_application.dto';
import { JobApplication } from './entities/job_application.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { basename } from 'path';
import { ManageJob } from 'src/manage_job/entities/manage_job.entity';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobApplicationRepository: Repository<JobApplication>,
    @InjectRepository(ManageJob)
    private readonly manageJobRepository: Repository<ManageJob>,
  ) {}

  async create(createJobApplicationDto: CreateJobApplicationDto, resumePath: string): Promise<JobApplication> {
    const resumeName = basename(resumePath);
    const jobData = await this.manageJobRepository.findOne({ where: { id: createJobApplicationDto.job_id } });

    const newJobApplication = this.jobApplicationRepository.create({
      ...createJobApplicationDto,
      resume: resumeName,
      manageJob: jobData,
    });

    return await this.jobApplicationRepository.save(newJobApplication);
  }

  async findAll() {
    const baseUrl = `${process.env.BASE_URL}/uploads/job-application/`;
    const jobApplications = await this.jobApplicationRepository.find({ 
      relations: ['manageJob'],
      order: { id: 'DESC' }
    });

    return jobApplications.map(application => ({
      ...application,
      resume: `${baseUrl}${application.resume}`
    }));
  }

  findOne(id: number) {
    return this.jobApplicationRepository.findOne({ where: { id } });
  }

  update(id: number, updateJobApplicationDto: UpdateJobApplicationDto) {
    return this.jobApplicationRepository.update(id, updateJobApplicationDto);
  }

  remove(id: number) {
    return this.jobApplicationRepository.delete(id);
  }
}
