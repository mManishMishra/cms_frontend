import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SizeType } from './size-type.entity';
import { PropertySubType } from 'src/property-sub-type/entities/property-sub-type.entity';
import { Package } from 'src/package/entities/package.entity';

@Entity('estimatercalculation')
export class Estimatercalculation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['1BHK', '2BHK', '3BHK', '4BHK'],
    nullable: false,
  })

  @Column({
    type: 'enum',
    enum: ['furniture', 'modular', 'services'],
    nullable: false,
    comment: 'Category of the item'
  })
  category: 'furniture' | 'modular' | 'services';

  @Column({ type: 'varchar', length: 100, nullable: false, comment: "bed, wardrobe, wallpaper, tiling" })
  description: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'int', nullable: false })
  rate: number;

  @Column({ type: 'int', nullable: false, comment: "Calculated amount for the item (quantity * rate)" })
  amount: number;

  @Column({ type: 'boolean', default: false })
  movable_furniture: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => SizeType)
  @JoinColumn({ name: 'size_type_id' })
  sizeType: SizeType;

  @ManyToOne(() => PropertySubType)
  @JoinColumn({ name: 'property_sub_type_id' })
  propertySubType: PropertySubType;

  @ManyToOne(() => Package)
  @JoinColumn({ name: 'package_id' })
  package: Package;
}
