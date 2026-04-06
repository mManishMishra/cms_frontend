import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('cms_product')
export class CmsProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    style: string;

    @Column()
    room_dimension: string;

    @Column()
    image: string;

    @Column()
    rating_count: number;

    @Column('decimal', { precision: 5, scale: 2 })
    rating: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}