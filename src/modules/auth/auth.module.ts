import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/jwt/jwt.constants';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
    imports: [
        PassportModule,
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1h' },
      }),
    ],
  controllers: [AuthController],
  providers: [AuthService,UserRepository, JwtStrategy, PassportModule],
})
export class AuthModule {}
