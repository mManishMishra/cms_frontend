import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class UserQuery {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    mobile: string;

    @Column()
    place: string;

    @Column()
    query: string;

    @Column()
    ip_address: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    source_url: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    lead_form_name: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    lead_form_type: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    trigger_type: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    cta_text: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    device_type: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
