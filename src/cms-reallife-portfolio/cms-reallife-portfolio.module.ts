import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { CmsReallifePortfolioService } from './cms-reallife-portfolio.service';
import { CmsReallifePortfolioController } from './cms-reallife-portfolio.controller';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CmsReallifePortfolio } from './entities/cms-reallife-portfolio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CmsReallifePortfolio]), // Register the entity here
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/reallife-portfolio',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [CmsReallifePortfolioController],
  providers: [CmsReallifePortfolioService],
})
export class CmsReallifePortfolioModule {}
