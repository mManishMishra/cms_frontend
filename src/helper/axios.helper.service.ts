import { HttpService } from "@nestjs/axios";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import configuration from "src/config/configuration";

@Injectable()
export class AxiosHelperService {
    config = configuration();
    constructor(private readonly httpService: HttpService) { }

    async sendOtp(phoneNumber: string) {
        try {
           
            const url = `https://control.msg91.com/api/v5/otp?authkey=${this.config.smsProvider.apiKey}&template_id=${this.config.smsProvider.templateId}&mobile=91${phoneNumber}`;
            console.log('key', this.config.smsProvider.apiKey);
            console.log('templateId', this.config.smsProvider.templateId);
            console.log('phoneNumber', phoneNumber);
            console.log('url', url);
            const response = await this.httpService.axiosRef.get(url);

            if (response?.data?.type !== "success") {
                throw new InternalServerErrorException("Failed to send OTP");
            }

            return response.data;
        } catch (error) {
            console.error("Error in sendOtp:", error.message);
            throw error;
        }
    }

    async verifyOtp(phoneNumber: string, otp: string) {
        try {
            const url = `https://control.msg91.com/api/v5/otp/verify?authkey=${this.config.smsProvider.apiKey}&mobile=91${phoneNumber}&otp=${otp}`;

            const response = await this.httpService.axiosRef.get(url);

            if (response?.data?.type !== "success") {
                throw new InternalServerErrorException("Invalid or expired OTP");
            }

            return response.data;
        } catch (error) {
            console.error("Error in verifyOtp:", error.message);
            throw error;
        }
    }
}
