import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum PageType {
    READY_TO_GO_DESIGN = 'ready_to_go_design',
    WALLPAPER = 'wallpaper',
    SPACE_SAVING_FURNITURE = 'space_saving_furniture',
    SUSTAINABLE_FURNITURE = 'sustainable_furniture',
    FURNITURE = 'furniture',
    SUSTAINABLE_FURNITURE_RATTAN = 'sustainable_furniture_rattan',
    SUSTAINABLE_FURNITURE_RECLAIMED_WOOD = 'sustainable_furniture_reclaimed_wood',
    GALLERY_DESIGN = 'gallery_design',
    DESIGNER_CHOICE = 'designer_choice',
    H3D_GALLERY = 'h3d_gallery',
    AWARD_GALLERY = 'award_gallery',
    EXPERIENCE_CENTER = 'experience_center',
    EXPERIENCE_CENTER_VIDEO = 'experience_center_video',
    EXPERIENCE_CENTER_GURUGRAM = 'experience_center_gurugram',
    EXPERIENCE_CENTER_GURUGRAM_VIDEO = 'experience_center_gurugram_video',
    EXPERIENCE_CENTER_FARIDABAD = 'experience_center_faridabad',
    EXPERIENCE_CENTER_FARIDABAD_VIDEO = 'experience_center_faridabad_video',
    PRODUCT = 'product',
}

@Entity('cms_parent_child')
export class CmsParentChild {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: PageType,
    })
    page_type: PageType;

    @Column('json')
    child_content: any;

    @Column('json')
    child_images: any;
}
