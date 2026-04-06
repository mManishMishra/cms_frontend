import { PartialType } from '@nestjs/swagger';
import { CreateCmsBlogDto } from './create-cms_blog.dto';

export class UpdateCmsBlogDto extends PartialType(CreateCmsBlogDto) {}
