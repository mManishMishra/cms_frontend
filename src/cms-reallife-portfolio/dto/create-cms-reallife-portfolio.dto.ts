import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCmsReallifePortfolioDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    imageUrl: string;
}
