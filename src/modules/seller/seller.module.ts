import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { RegisterSellerController } from './controllers/registerSeller.controller';
import { RegisterSellerService } from './services/registerSeller.service';
import { SupabaseService } from '../common/subapase/supabase.service';
const httpController = [
    RegisterSellerController
]

const Repository = [
]


const Services = [
    RegisterSellerService,
    SupabaseService,
    JwtService,
]

@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services, ...Repository],
})
export class SellerModule { }     
