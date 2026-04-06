export class CreateUserQueryDto {
  name: string;
  email: string;
  mobile: string;
  place: string;
  query: string;
  ip_address?: string;
  source_url?: string;
  lead_form_name?: string;
  lead_form_type?: string;
  trigger_type?: string;
  cta_text?: string;
  device_type?: string;
}
