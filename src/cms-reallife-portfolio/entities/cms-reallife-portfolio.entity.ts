import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('cms_reallife_portfolio')
export class CmsReallifePortfolio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    style: string;

    @Column()
    room_dimension: string;

    @Column()
    image: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}