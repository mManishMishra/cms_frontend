import { PartialType } from '@nestjs/swagger';
import { CreateCmsReallifePortfolioDto } from './create-cms-reallife-portfolio.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCmsReallifePortfolioDto extends PartialType(CreateCmsReallifePortfolioDto) {
    @IsOptional()
    @IsString()
    image?: string;
}
