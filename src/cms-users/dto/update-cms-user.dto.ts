import { PartialType } from '@nestjs/swagger';
import { CreateCmsUserDto } from './create-cms-user.dto';

export class UpdateCmsUserDto extends PartialType(CreateCmsUserDto) {}
