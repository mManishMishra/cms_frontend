import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send')
  async send(@Body() requestBody : any) {
    const response = await this.otpService.sendOtp(requestBody);
        return response;
  }

  @Post('verify')
    async verify(@Body() requestBody: any) {
        const response = await this.otpService.verifyOtp(requestBody);
        return response;
    }
}
