import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CmsPagesService } from './cms-pages.service';
import { CmsPagesController } from './cms-pages.controller';
import { CmsPage } from './entities/cms-page.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CmsPage])],
    controllers: [CmsPagesController],
    providers: [CmsPagesService],
    exports: [CmsPagesService]
})
export class CmsPagesModule {}