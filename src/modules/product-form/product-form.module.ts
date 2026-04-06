import { Module } from '@nestjs/common';
import { ProductFormService } from './product-form.service';
import { ProductFormController } from './product-form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductForm } from 'src/entities/product-form.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductForm])],
    controllers: [ProductFormController],
    providers: [ProductFormService],
})
export class ProductFormModule {}
