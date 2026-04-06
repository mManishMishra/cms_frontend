// src/estimater/entities/estimater.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Estimater {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ length: 10 })
  mobile: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  query: string;

  @Column()
  home: string;

  @Column()
  bedrooms: number;

  @Column()
  bathrooms: number;

  @Column()
  living: number;

  @Column()
  kitchen: number;

  @Column('json')
  json_content: any;

  @Column()
  total_price: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
