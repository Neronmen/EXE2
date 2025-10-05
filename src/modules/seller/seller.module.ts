import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { RegisterSellerController } from './controllers/registerSeller.controller';
import { RegisterSellerService } from './services/registerSeller.service';
import { SupabaseService } from '../common/subapase/supabase.service';
import { GetProfileRegisterSellerController } from './controllers/getProfileRegisterSeller.controller';
import { GetProfileRegisterSellerService } from './services/getProfileRegisterSeller.service';
import { GetSellersRegisterSellerController } from './controllers/getSellersRegisterSeller.controller';
import { GetSellersRegisterSellerService } from './services/getSellersRegisterSeller.service';
import { AuthModule } from '../auth/auth.module';
import { GetDetailProfileRegisterSellerController } from './controllers/getDetailRegisterSeller.controller';
import { GetDetailSellersRegisterSellerService } from './services/getDetailRegisterSeller.service';
import { NotificationGateway } from '../notifications/gateway/notification.gateway';
import { ApproveRegisterSellerController } from './controllers/approveRegisterSeller.controller';
import { ApproveRegisterSellerService } from './services/approveRegisterSeller.service';
import { RejectRegisterSellerController } from './controllers/rejectRegisterSeller.controller';
import { RejectRegisterSellerService } from './services/rejectRegisterSeller.service';
import { ResubmitRegisterSellerController } from './controllers/resubmitRegisterSeller.controller';
import { ResubmitRegisterSellerService } from './services/resubmitRegisterSeller.service';
const httpController = [
    RegisterSellerController,
    GetProfileRegisterSellerController,
    GetSellersRegisterSellerController,
    GetDetailProfileRegisterSellerController,
    ApproveRegisterSellerController,
    RejectRegisterSellerController,
    ResubmitRegisterSellerController
]

const Repository = [
]


const Services = [
    RegisterSellerService,
    GetProfileRegisterSellerService,
    GetSellersRegisterSellerService,
    GetDetailSellersRegisterSellerService,
    ApproveRegisterSellerService,
    RejectRegisterSellerService,
    ResubmitRegisterSellerService,
    SupabaseService,
    JwtService,
]

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [...httpController],
    providers: [...Services, ...Repository, NotificationGateway],
})
export class SellerModule { }     
