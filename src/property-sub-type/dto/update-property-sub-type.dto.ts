import { PartialType } from '@nestjs/swagger';
import { CreatePropertySubTypeDto } from './create-property-sub-type.dto';

export class UpdatePropertySubTypeDto extends PartialType(CreatePropertySubTypeDto) {}
