import { PartialType } from '@nestjs/swagger';
import { CreateContentManagerDto } from './create-content-manager.dto';

export class UpdateContentManagerDto extends PartialType(CreateContentManagerDto) {}
