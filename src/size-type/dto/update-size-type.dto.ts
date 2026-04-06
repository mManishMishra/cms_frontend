import { PartialType } from '@nestjs/swagger';
import { CreateSizeTypeDto } from './create-size-type.dto';

export class UpdateSizeTypeDto extends PartialType(CreateSizeTypeDto) {}
