import { PartialType } from '@nestjs/swagger';
import { CreateLookMenuDto } from './create-look_menu.dto';

export class UpdateLookMenuDto extends PartialType(CreateLookMenuDto) {}
