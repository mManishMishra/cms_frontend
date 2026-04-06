import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { CmsGalleryDesignService } from './cms-gallery-design.service';
import { CmsGalleryDesignController } from './cms-gallery-design.controller';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CmsGalleryDesign } from './entities/cms-gallery-design.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CmsGalleryDesign]), // Register the entity here
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/design-gallery',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [CmsGalleryDesignController],
  providers: [CmsGalleryDesignService],
})
export class CmsGalleryDesignModule {}