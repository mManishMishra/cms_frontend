// src/contact/entities/contact.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  contactNo: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  query: string;

  @Column({ default: false })
  termsAccepted: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
