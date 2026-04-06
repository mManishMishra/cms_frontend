// src/product-form/entities/product-form.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('product_forms')
export class ProductForm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  designerName: string;

  @Column({ default: false })
  termsAccepted: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
