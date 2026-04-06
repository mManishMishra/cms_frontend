// src/product-form/product-form.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductFormDto } from './dto/create-product-form.dto';
import { ProductForm } from 'src/entities/product-form.entity';

@Injectable()
export class ProductFormService {
  constructor(
    @InjectRepository(ProductForm)
    private readonly productFormRepository: Repository<ProductForm>,
  ) {}

  async create(createProductFormDto: CreateProductFormDto): Promise<ProductForm> {
    const productForm = this.productFormRepository.create(createProductFormDto);
    return await this.productFormRepository.save(productForm);
  }

  // Optional: Get all form submissions (for admin use, perhaps)
  async findAll(): Promise<ProductForm[]> {
    return await this.productFormRepository.find();
  }

  // Optional: Find a specific form by ID
  async findOne(id: number): Promise<ProductForm> {
    const productForm = await this.productFormRepository.findOne({ where: { id } });
    if (!productForm) {
      throw new NotFoundException(`Product form with ID ${id} not found`);
    }
    return productForm;
  }
}
