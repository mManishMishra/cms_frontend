import { Module } from '@nestjs/common';
import { CmsParentChildService } from './cms_parent_child.service';
import { CmsParentChildController } from './cms_parent_child.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CmsParentChild } from './entities/cms_parent_child.entity';
import { MediaAsset } from './entities/media-asset.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([CmsParentChild, MediaAsset]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/parent-child',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [CmsParentChildController],
  providers: [CmsParentChildService],
})
export class CmsParentChildModule {}
