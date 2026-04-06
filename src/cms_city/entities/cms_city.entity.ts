// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// export enum CityType {
//     DELHI = 'delhi',
//     NOIDA = 'noida',
//     MANESAR = 'manesar',
//     GURUGRAM = 'gurugram',
//     GHAZIABAD = 'ghaziabad',
//     DWARKA = 'dwarka',
//     FARIDABAD = 'faridabad',
//     GREATER_NOIDA = 'greater_noida'
// }

// @Entity("cms_city")
// export class CmsCity {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({
//         type: 'enum',
//         enum: CityType
//     })
//     city_type: CityType;

//     @Column()
//     main_title: string;

//     @Column('longtext')
//     main_description: string;

//     @Column()
//     location_image: string;

//     @Column()
//     side_title: string;

//     @Column('longtext')
//     side_description: string;

//     @Column()
//     side_image: string;

//     @Column('json')
//     seo_content: any;

//     @CreateDateColumn()
//     created_at: Date;

//     @UpdateDateColumn()
//     updated_at: Date;
// }
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity("cms_city")
export class CmsCity {
    @PrimaryGeneratedColumn()
    id: number;

    // CHANGED: From enum to varchar. 
    @Column({ type: 'varchar', length: 255, })
    city_type: string;

    @Column()
    main_title: string;

    @Column('longtext')
    main_description: string;

    @Column({ nullable: true }) 
    location_image: string;

    @Column()
    side_title: string;

    @Column('longtext')
    side_description: string;

    @Column({ nullable: true }) 
    side_image: string;

    @Column('json', { nullable: true })
    seo_content: any;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}