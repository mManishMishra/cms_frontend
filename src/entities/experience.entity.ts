// src/experience/entities/experience.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('experience_inquiries')
export class ExperienceInquiry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ default: false })
  whatsappUpdates: boolean;

  @Column()
  propertyName: string;

  @Column({ default: false })
  termsAccepted: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
