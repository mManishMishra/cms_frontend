import { PartialType } from '@nestjs/swagger';
import { CreateLetsConnectDto } from './create-lets-connect.dto';

export class UpdateLetsConnectDto extends PartialType(CreateLetsConnectDto) {}
