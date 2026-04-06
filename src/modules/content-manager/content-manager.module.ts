import { Module } from '@nestjs/common';
import { ContentManagerService } from './content-manager.service';
import { ContentManagerController } from './content-manager.controller';
import { ContentManagerRepository } from 'src/repositories/content-manager.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentManager } from 'src/entities/content-manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentManager])],
  controllers: [ContentManagerController],
  providers: [ContentManagerService,ContentManagerRepository],
  exports: [ContentManagerService],
})
export class ContentManagerModule {}
