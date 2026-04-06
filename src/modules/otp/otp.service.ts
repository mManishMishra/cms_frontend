import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosHelperService } from 'src/helper/axios.helper.service';

@Injectable()
export class OtpService {
    constructor(private readonly axiosService: AxiosHelperService) {}

    async sendOtp(requestBody: any) {
        try {
            const response = await this.axiosService.sendOtp(requestBody.phoneNumber);

            return {
                success: true,
                message: 'OTP sent successfully',
                data: response,
            };
        } catch (error) {
            console.error('Error in sendOtp:', error.message);
            throw new InternalServerErrorException('An error occurred while sending OTP');
        }
    }

    async verifyOtp(requestBody: any) {
        try {
            const response = await this.axiosService.verifyOtp(requestBody.phoneNumber, requestBody.otp);

            return {
                success: true,
                message: 'OTP verified successfully',
                data: response,
            };
        } catch (error) {
            console.error('Error in verifyOtp:', error.message);

            if (error.response?.status === 400) {
                throw new BadRequestException('Incorrect or expired OTP');
            }
            throw new InternalServerErrorException('An error occurred while verifying OTP');
        }
    }
}
