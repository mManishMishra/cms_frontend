import { Module } from '@nestjs/common';
import { CmsBlogService } from './cms_blog.service';
import { CmsBlogController } from './cms_blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CmsBlog } from './entities/cms_blog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CmsBlog]), // Register the entity here
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/blog',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [CmsBlogController],
  providers: [CmsBlogService],
})
export class CmsBlogModule {}
