import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  gender: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  alternatePhoneNumber: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  postalCode: string;

  @Column({ nullable: true })
  preferredCurrency: string;

  @Column({ nullable: true })
  languagePreference: string;

  @Column({ type: 'simple-json', nullable: true })
  purchaseHistory: string[];

  @Column({ type: 'simple-json', nullable: true })
  favoriteProperties: string[];

  @Column({ default: false })
  isVerified: boolean;

    // 🌟 NEW: Added status column for suspending users without deleting them
    @Column({ default: 'Active' })
    status: string;
    
  @Column({ default: 'User' })
  role: string;

  @Column({ type: 'simple-json', nullable: true })
  cms_permissions?: {
    canPublish: boolean;
    canDelete: boolean;
  };

  @Column({ type: 'simple-json', nullable: true })
  savedPaymentMethods: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
