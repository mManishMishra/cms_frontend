import { PartialType } from '@nestjs/swagger'; // or '@nestjs/mapped-types'
import { CreateCmsCityDto } from './create-cms_city.dto';

export class UpdateCmsCityDto extends PartialType(CreateCmsCityDto) {}