import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('seo_tag')
export class SeoTag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    meta_description: string;

    @Column()
    page_name: string;

    @Column()
    meta_can_tag: string;

    @Column({ nullable: true })
    meta_image: string;

    // --- NEW FIELDS ---
    @Column({ nullable: true, default: 'index, follow' })
    meta_robots: string;

    @Column({ nullable: true })
    og_image: string;
    // ------------------

    @Column({ type: 'boolean', default: true })
    include_in_sitemap: boolean;

    @Column({ nullable: true, default: 'monthly' })
    sitemap_change_frequency: string;

    @Column({ nullable: true, default: '0.8' })
    sitemap_priority: string;
  
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
}
