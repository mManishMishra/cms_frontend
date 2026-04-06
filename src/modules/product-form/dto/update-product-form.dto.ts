import { PartialType } from '@nestjs/swagger';
import { CreateProductFormDto } from './create-product-form.dto';

export class UpdateProductFormDto extends PartialType(CreateProductFormDto) {}
