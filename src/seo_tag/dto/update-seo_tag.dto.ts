import { PartialType } from '@nestjs/mapped-types'; // Note: Or '@nestjs/swagger' if you use Swagger
import { CreateSeoTagDto } from './create-seo_tag.dto';

export class UpdateSeoTagDto extends PartialType(CreateSeoTagDto) {}