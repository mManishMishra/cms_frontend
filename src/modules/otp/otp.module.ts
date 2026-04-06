import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { AxiosHelperService } from 'src/helper/axios.helper.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule.register({timeout:5000})],
  controllers: [OtpController],
  providers: [OtpService,AxiosHelperService],
})
export class OtpModule {}
