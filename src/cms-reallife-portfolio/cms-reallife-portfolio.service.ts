import { Injectable } from '@nestjs/common';
import { CreateCmsReallifePortfolioDto } from './dto/create-cms-reallife-portfolio.dto';
import { UpdateCmsReallifePortfolioDto } from './dto/update-cms-reallife-portfolio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CmsReallifePortfolio } from './entities/cms-reallife-portfolio.entity';
import { Repository } from 'typeorm';
import { basename } from 'path';

@Injectable()
export class CmsReallifePortfolioService {

  constructor(
    @InjectRepository(CmsReallifePortfolio)
    private readonly cmsReallifePortfolioRepository: Repository<CmsReallifePortfolio>,
  ) {}

  async create(createCmsReallifePortfolioDto: CreateCmsReallifePortfolioDto, imagePath: string): Promise<CmsReallifePortfolio> {
    const imageName = basename(imagePath); // Extract the filename from the path
    const newRecord = this.cmsReallifePortfolioRepository.create({
      ...createCmsReallifePortfolioDto,
      image: imageName,
    });
    return await this.cmsReallifePortfolioRepository.save(newRecord);
  }

  async findAll() {
    const baseUrl = `${process.env.BASE_URL}/uploads/reallife-portfolio/`;
    const portfolios = await this.cmsReallifePortfolioRepository.find();

    return portfolios.map(portfolio => ({
      ...portfolio,
      image: portfolio.image ? `${baseUrl}${portfolio.image}` : null,
    }));
  }

  async findOne(id: number): Promise<CmsReallifePortfolio> {
    return this.cmsReallifePortfolioRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCmsReallifePortfolioDto: UpdateCmsReallifePortfolioDto, imagePath: string | null): Promise<CmsReallifePortfolio> {
    const existingRecord = await this.cmsReallifePortfolioRepository.findOne({ where: { id } });
    if (!existingRecord) {
      throw new Error('Record not found');
    }

    if (imagePath) {
      const imageName = basename(imagePath); // Extract the filename from the path
      updateCmsReallifePortfolioDto.image = imageName;
    }

    await this.cmsReallifePortfolioRepository.update(id, updateCmsReallifePortfolioDto);
    return this.cmsReallifePortfolioRepository.findOne({ where: { id } });
  }

}
