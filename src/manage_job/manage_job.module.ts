import { Module } from '@nestjs/common';
import { ManageJobService } from './manage_job.service';
import { ManageJobController } from './manage_job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageJob } from './entities/manage_job.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ManageJob])],
  controllers: [ManageJobController],
  providers: [ManageJobService],
})
export class ManageJobModule {}
