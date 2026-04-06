import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('site_settings')
export class SiteSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  facebook_url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  instagram_url: string;

  // --- NEW SOCIAL LINKS ---
  @Column({ type: 'varchar', length: 255, nullable: true })
  twitter_url: string; // Used for X

  @Column({ type: 'varchar', length: 255, nullable: true })
  linkedin_url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pinterest_url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  youtube_url: string;

  @UpdateDateColumn()
  updated_at: Date;
}