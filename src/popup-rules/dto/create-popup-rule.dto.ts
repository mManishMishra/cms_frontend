export class CreatePopupRuleDto {
    target_url: string;
    is_enabled?: boolean;
    show_mobile?: boolean;
    show_desktop?: boolean;
    trigger_type?: string;
    delay_seconds?: number;
    scroll_percentage?: number;
    heading?: string;
    sub_heading?: string;
    cta_text?: string;
    lead_form_name?: string;
    redirect_url?: string;
    success_message?: string;
}
