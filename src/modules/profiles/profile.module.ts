import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { GetProfileController } from './controllers/getProfile.controller';
import { GetProfileService } from './services/getProfile.service';
import { EditProfileController } from './controllers/editProfile.controller';
import { EditProfileService } from './services/editProfile.service';
import { SupabaseService } from '../common/subapase/supabase.service';
import { ProfileRepository } from './repositories/profile.repository';

const httpController = [
    GetProfileController,
    EditProfileController
]

const Repository = [
    ProfileRepository
]


const Services = [
    GetProfileService,
    EditProfileService,
    SupabaseService,
    JwtService
]

@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services, ...Repository],
})
export class ProfileModule { }     
