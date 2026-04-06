import { Module } from '@nestjs/common';
import { CmsContentService } from './cms_content.service';
import { CmsContentController } from './cms_content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CmsContent } from './entities/cms_content.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([CmsContent]), // Register the entity here
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/cms-content',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [CmsContentController],
  providers: [CmsContentService],
})
export class CmsContentModule {}
