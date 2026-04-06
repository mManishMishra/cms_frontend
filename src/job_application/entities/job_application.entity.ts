import { ManageJob } from 'src/manage_job/entities/manage_job.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class JobApplication {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ManageJob)
    @JoinColumn({ name: 'job_id' })
    manageJob: ManageJob;

    @Column()
    your_job_title: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    resume: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
