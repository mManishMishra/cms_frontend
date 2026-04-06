import { Module } from '@nestjs/common';
import { CmsExperienceCenterService } from './cms-experience-center.service';
import { CmsExperienceCenterController } from './cms-experience-center.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CmsExperienceCenter } from './entities/cms-experience-center.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([CmsExperienceCenter]), // Register the entity here
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/experience-center',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [CmsExperienceCenterController],
  providers: [CmsExperienceCenterService],
})
export class CmsExperienceCenterModule {}
