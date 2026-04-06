import { Module } from '@nestjs/common';
import { PortfolioProjectService } from './portfolio_project.service';
import { PortfolioProjectController } from './portfolio_project.controller';
import { PortfolioProject } from './entities/portfolio_project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([PortfolioProject]), // Register the entity here
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/portfolio-projects',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [PortfolioProjectController],
  providers: [PortfolioProjectService],
})
export class PortfolioProjectModule {}
