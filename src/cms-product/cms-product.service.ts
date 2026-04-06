import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCmsProductDto } from './dto/create-cms-product.dto';
import { UpdateCmsProductDto } from './dto/update-cms-product.dto';
import { CmsProduct } from './entities/cms-product.entity';
import { basename } from 'path';

@Injectable()
export class CmsProductService {
  constructor(
    @InjectRepository(CmsProduct)
    private readonly cmsProductRepository: Repository<CmsProduct>,
  ) {}

  async create(createCmsProductDto: CreateCmsProductDto, imagePath: string): Promise<CmsProduct> {
    const imageName = basename(imagePath); // Extract the filename from the path
    const newRecord = this.cmsProductRepository.create({
      ...createCmsProductDto,
      image: imageName,
    });
    return await this.cmsProductRepository.save(newRecord);
  }

  async findAll() {
    const baseUrl = `${process.env.BASE_URL}/uploads/product/`;
    const products = await this.cmsProductRepository.find();

    return products.map(product => ({
      ...product,
      image: product.image ? `${baseUrl}${product.image}` : null,
    }));
  }

  findOne(id: number) {
    return this.cmsProductRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCmsProductDto: UpdateCmsProductDto, imagePath: string | null) {
    const existingRecord = await this.cmsProductRepository.findOne({ where: { id } });
    if (!existingRecord) {
      throw new Error('Record not found');
    }

    if (imagePath) {
      const imageName = basename(imagePath); // Extract the filename from the path
      updateCmsProductDto.image = imageName;
    }

    await this.cmsProductRepository.update(id, updateCmsProductDto);
    return this.cmsProductRepository.findOne({ where: { id } });
  }

}