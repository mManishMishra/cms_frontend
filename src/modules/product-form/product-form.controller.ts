// src/product-form/product-form.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductFormService } from './product-form.service';
import { CreateProductFormDto } from './dto/create-product-form.dto';
import { ProductForm } from 'src/entities/product-form.entity';

@Controller('product-form')
export class ProductFormController {
  constructor(private readonly productFormService: ProductFormService) {}

  @Post()
  async create(@Body() createProductFormDto: CreateProductFormDto): Promise<ProductForm> {
    return this.productFormService.create(createProductFormDto);
  }

  // Optional: Get all form submissions (for admin use, perhaps)
  @Get()
  async findAll(): Promise<ProductForm[]> {
    return this.productFormService.findAll();
  }

  // Optional: Find a specific form by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProductForm> {
    return this.productFormService.findOne(id);
  }
}
