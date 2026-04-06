import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum PageType {
    REFER_AND_EARN = 'refer_and_earn',
    PRIVACY_POLICY = 'privacy_policy',
    TERM_AND_CONDITION = 'term_and_condition',
    ABOUT_US = 'about_us',
    ABOUT_US_SLIDER = 'about_us_slider',
    HOMEPAGE_BANNER = 'homepage_banner',
    SERVICE = 'service',
    TEAM = 'team',
    AWARD_GALLERY = 'award_gallery',
    BLOG = 'blog',
    EXPERIENCE_CENTER = 'experience_center',
    HOW_IT_WORKS = 'how_it_works',
    FAQ = 'faq',
    FAQS = 'faqs',
    HOME_PAGE_CONTENT = 'home_page_content',
    HOME_PAGE_CONTENT_HOW_WE_WORK = 'home_page_content_how_we_work',
    HOME_PAGE_CONTENT_WHAT_WE_ARE = 'home_page_content_what_we_are',
    HOME_PAGE_CONTENT_MEET_US = 'home_page_content_meet_us',
    HOME_PAGE_CONTENT_EVERY_SPACE = 'home_page_content_every_space',
    CANCELLATION_POLICY = 'cancellation_policy',
    CREATING_THE_HOME_OF_YOUR_DREAMS = 'creating_the_home_of_your_dreams',
    CREATING_THE_HOME_OF_YOUR_DREAMS_2 = 'creating_the_home_of_your_dreams_2',
    CREATING_THE_HOME_OF_YOUR_DREAMS_3 = 'creating_the_home_of_your_dreams_3',
    CREATING_THE_HOME_OF_YOUR_DREAMS_4 = 'creating_the_home_of_your_dreams_4',
    CREATING_THE_HOME_OF_YOUR_DREAMS_5 = 'creating_the_home_of_your_dreams_5',
    CREATING_THE_HOME_OF_YOUR_DREAMS_6 = 'creating_the_home_of_your_dreams_6',
 }

@Entity('cms_content')
export class CmsContent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: PageType,
    })
    page_type: PageType;

    @Column('json')
    json_content: any;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}