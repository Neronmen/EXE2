import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { TestController } from './controllers/test.controller';
import { AuthRepository } from './repositories/auth.repository';
import { SignUpController } from './controllers/signup.controller';
import { SignUpService } from './services/signup.service';
import { RefreshController } from './controllers/refresh-token.controller';
import { RefreshService } from './services/refresh-token.service';
import { ForgotPasswordController } from './controllers/forgot-password.controller';
import { ForgotPasswordService } from './services/forgot-password.service';
import { MailerModule } from '../common/mail/mail.module';
import { ResetPasswordController } from './controllers/reset-password.controller';
import { ResetPasswordService } from './services/reset-password.service';
import { VerifyOtpController } from './controllers/verify-otp.controller';
import { VerifyOtpService } from './services/verify-otp.service';
import { ResendOTPController } from './controllers/resend-otp.controller';
import { ResendOTPService } from './services/resend-otp.service';
import { LoginFacebookController } from './controllers/login-facebook.controller';
import { LoginFacebookService } from './services/login-facebook.service';


const httpController = [
    LoginController,
    SignUpController,
    RefreshController,
    ForgotPasswordController,
    VerifyOtpController,
    ResetPasswordController,
    ResendOTPController,
    LoginFacebookController,
    TestController
]

const Repository = [
    AuthRepository
]


const Services = [
    LoginService,
    SignUpService,
    RefreshService,
    ForgotPasswordService,
    VerifyOtpService,
    ResetPasswordService,
    ResendOTPService,
    LoginFacebookService,
    JwtService
]

@Module({
    imports: [PrismaModule, MailerModule],
    controllers: [...httpController],
    providers: [...Services, ...Repository],
    exports: [AuthRepository]
})
export class AuthModule { }     
