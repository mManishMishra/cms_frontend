import { PartialType } from '@nestjs/swagger';
import { CreateReachOutDto } from './create-reach-out.dto';

export class UpdateReachOutDto extends PartialType(CreateReachOutDto) {}
