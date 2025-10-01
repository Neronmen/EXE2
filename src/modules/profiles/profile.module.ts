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
const httpController = [
    GetProfileController,
    EditProfileController,
    ChangePassProfileController
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
    ChangePassProfileService
]

@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services, ...Repository],
})
export class ProfileModule { }     
