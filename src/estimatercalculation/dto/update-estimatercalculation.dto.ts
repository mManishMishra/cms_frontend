import { PartialType } from '@nestjs/swagger';
import { CreateEstimatercalculationDto } from './create-estimatercalculation.dto';

export class UpdateEstimatercalculationDto extends PartialType(CreateEstimatercalculationDto) {}
