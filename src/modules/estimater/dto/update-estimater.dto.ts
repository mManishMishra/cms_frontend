import { PartialType } from '@nestjs/swagger';
import { CreateEstimaterDto } from './create-estimater.dto';

export class UpdateEstimaterDto extends PartialType(CreateEstimaterDto) {}
