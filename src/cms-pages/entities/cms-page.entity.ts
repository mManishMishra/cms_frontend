import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('cms_pages')
export class CmsPage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 , default: ''})
    title: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    writer_name: string;

    // --- NEW: Toggle to show/hide author and date ---
    @Column({ type: 'boolean', default: false })
    show_author_date: boolean;

    @Column({ type: 'longtext', nullable: true })
    content: string;

    @Column({ type: 'json', nullable: true })
    faqs: any; 

    @Column({ type: 'json', nullable: true })
    accordions: any; 

    @Column({ type: 'json', nullable: true })
    content_blocks: any; 

    @Column({ type: 'varchar', length: 50, default: 'Draft' })
    status: string;

    @Column({ type: 'json', nullable: true })
    seo_content: any;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}