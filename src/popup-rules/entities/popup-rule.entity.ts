import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('popup_rules')
export class PopupRule {
    @PrimaryGeneratedColumn()
    id: number;

    // Target URL: '/' for home, '/about-us' for specific pages, or '*' for global fallback
    @Column({ type: 'varchar', length: 255, unique: true })
    target_url: string; 

    @Column({ type: 'boolean', default: true })
    is_enabled: boolean;

    @Column({ type: 'boolean', default: true })
    show_mobile: boolean;

    @Column({ type: 'boolean', default: true })
    show_desktop: boolean;

    // --- Triggers & Timing ---
    @Column({ type: 'varchar', length: 50, default: 'time' })
    trigger_type: string; // 'time', 'scroll', or 'exit'

    @Column({ type: 'int', default: 12 })
    delay_seconds: number;

    @Column({ type: 'int', default: 50 })
    scroll_percentage: number;

    // --- Customization ---
    @Column({ type: 'varchar', length: 255, default: "Lets Connect" })
    heading: string;

    @Column({ type: 'varchar', length: 255, default: "Get Your Dream Home Interior. Let Our experts help you" })
    sub_heading: string;

    @Column({ type: 'varchar', length: 50, default: 'SEND' })
    cta_text: string;

    @Column({ type: 'varchar', length: 255, default: 'General Popup Lead Form' })
    lead_form_name: string;

    @Column({ type: 'varchar', length: 255, default: '/thank-you' })
    redirect_url: string;

    @Column({ type: 'varchar', length: 255, default: 'Form submitted successfully!' })
    success_message: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
