import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('cms_blog')
export class CmsBlog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar', length: 255 })
    writer_name: string;

    @Column({ type: 'timestamp' })
    published_on: Date;

    @Column({ type: 'varchar', length: 255 })
    image: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image_alt: string;

    @Column({ type: 'varchar', length: 50, default: 'Draft' })
    status: string;

    @Column('json')
    seo_content: any;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
