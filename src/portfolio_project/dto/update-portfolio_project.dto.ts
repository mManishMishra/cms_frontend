import { PartialType } from '@nestjs/swagger';
import { CreatePortfolioProjectDto } from './create-portfolio_project.dto';

export class UpdatePortfolioProjectDto extends PartialType(CreatePortfolioProjectDto) {
    image?: string;
    status?: any
}
