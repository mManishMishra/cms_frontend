import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCmsExperienceCenterDto } from './dto/create-cms-experience-center.dto';
import { UpdateCmsExperienceCenterDto } from './dto/update-cms-experience-center.dto';
import { CmsExperienceCenter } from './entities/cms-experience-center.entity';
import { basename } from 'path';

@Injectable()
export class CmsExperienceCenterService {
  constructor(
    @InjectRepository(CmsExperienceCenter)
    private readonly cmsExperienceCenterRepository: Repository<CmsExperienceCenter>,
  ) {}

  async create(createCmsExperienceCenterDto: CreateCmsExperienceCenterDto, imagePath: string): Promise<CmsExperienceCenter> {
    const imageName = basename(imagePath); // Extract the filename from the path
    const newRecord = this.cmsExperienceCenterRepository.create({
      ...createCmsExperienceCenterDto,
      image: imageName,
    });
    return await this.cmsExperienceCenterRepository.save(newRecord);
  }

  async findAll() {
    const baseUrl = `${process.env.BASE_URL}/uploads/experience-center/`;
    const centers = await this.cmsExperienceCenterRepository.find();

    return centers.map(center => ({
      ...center,
      image: center.image ? `${baseUrl}${center.image}` : null,
    }));
  }

  findOne(id: number) {
    return this.cmsExperienceCenterRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCmsExperienceCenterDto: UpdateCmsExperienceCenterDto, imagePath: string | null) {
    const existingRecord = await this.cmsExperienceCenterRepository.findOne({ where: { id } });
    if (!existingRecord) {
      throw new Error('Record not found');
    }

    if (imagePath) {
      const imageName = basename(imagePath); // Extract the filename from the path
      updateCmsExperienceCenterDto.image = imageName;
    }

    await this.cmsExperienceCenterRepository.update(id, updateCmsExperienceCenterDto);
    return this.cmsExperienceCenterRepository.findOne({ where: { id } });
  }

}