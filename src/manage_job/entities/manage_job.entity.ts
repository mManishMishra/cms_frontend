import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class ManageJob {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    experience_required: string;

    @Column()
    location: string;

    @Column()
    last_date: Date;
    @Column({
        type: 'enum',
        enum: ['active', 'inactive'],
        default: 'active'
    })
    status: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @Column()
    job_opening: string;
}
