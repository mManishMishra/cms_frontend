import { Module } from '@nestjs/common';
import { CmsCityService } from './cms_city.service';
import { CmsCityController } from './cms_city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CmsCity } from './entities/cms_city.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([CmsCity]), // Register the entity here
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/city',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [CmsCityController],
  providers: [CmsCityService],
})
export class CmsCityModule { }
