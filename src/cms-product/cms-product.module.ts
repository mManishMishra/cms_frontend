import { Module } from '@nestjs/common';
import { CmsProductService } from './cms-product.service';
import { CmsProductController } from './cms-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CmsProduct } from './entities/cms-product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([CmsProduct]), // Register the entity here
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/product',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [CmsProductController],
  providers: [CmsProductService],
})
export class CmsProductModule {}
