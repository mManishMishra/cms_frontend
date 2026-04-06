import { Module } from '@nestjs/common';
import { JobApplicationService } from './job_application.service';
import { JobApplicationController } from './job_application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from './entities/job_application.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ManageJob } from 'src/manage_job/entities/manage_job.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobApplication, ManageJob]), // Register the entity here
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/job-application',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
})
export class JobApplicationModule {}
