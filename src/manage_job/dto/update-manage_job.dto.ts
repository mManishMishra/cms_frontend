import { PartialType } from '@nestjs/swagger';
import { CreateManageJobDto } from './create-manage_job.dto';

export class UpdateManageJobDto extends PartialType(CreateManageJobDto) {}
