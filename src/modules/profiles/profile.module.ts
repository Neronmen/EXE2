import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { GetProfileController } from './controllers/getProfile.controller';
import { GetProfileService } from './services/getProfile.service';
import { EditProfileController } from './controllers/editProfile.controller';
import { EditProfileService } from './services/editProfile.service';
import { SupabaseService } from '../common/subapase/supabase.service';
import { ProfileRepository } from './repositories/profile.repository';
import { ChangePassProfileController } from './controllers/changePassProfile.controller';
import { ChangePassProfileService } from './services/changePassProfile.service';
import { ChangePassProfileRepository } from './repositories/changePassProfile.repository';
import { ChangeEmailProfileController } from './controllers/changeEmail.controller';
import { ChangeEmailService } from './services/changeEmail.service';
import { VerifyOtpEmailController } from './controllers/verify-otp-email.controller';
import { VerifyOtpEmailService } from './services/verify-otp-email.service';
import { MailerModule } from '../common/mail/mail.module';
import { ResendOTPEmailController } from './controllers/resend-otp-email.controller';
import { ResendOTPEmailService } from './services/resend-otp-email.service';
import { ResetEmailController } from './controllers/resetEmail.controller';
import { ResetPasswordService } from './services/resetEmail.service';
const httpController = [
    GetProfileController,
    EditProfileController,
    ChangePassProfileController,
    ChangeEmailProfileController,
    VerifyOtpEmailController,
    ResendOTPEmailController,
    ResetEmailController
]

const Repository = [
    ProfileRepository,
    ChangePassProfileRepository
]


const Services = [
    GetProfileService,
    EditProfileService,
    SupabaseService,
    JwtService,
    ChangePassProfileService,
    ChangeEmailService,
    VerifyOtpEmailService,
    ResendOTPEmailService,
    ResetPasswordService
]

@Module({
    imports: [PrismaModule, MailerModule],
    controllers: [...httpController],
    providers: [...Services, ...Repository],
})
export class ProfileModule { }     
