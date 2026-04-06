import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


export enum PortfolioPageType {
    RESIDENTIAL_PROJECTS = 'residential_projects',
    LUXURY_PROJECTS = 'luxury_projects',
}

@Entity('portfolio_projects')
export class PortfolioProject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @Column()
    title: string;

    @Column()
    description: string;

    
    @Column({
        type: 'enum',
        enum: PortfolioPageType,
    })
    type: PortfolioPageType;

    @Column('json')
    child_images: any;
    
    @Column({ default: true })
    status: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}