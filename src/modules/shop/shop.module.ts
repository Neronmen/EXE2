import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

import { SupabaseService } from '../common/subapase/supabase.service';

import { AuthModule } from '../auth/auth.module';

import { NotificationGateway } from '../notifications/gateway/notification.gateway';
import { GetProfileShopController } from './controllers/getProfileShop.controller';
import { GetProfileShopService } from './services/getProfileShop.service';
import { UpdateShopController } from './controllers/updateProfileShop.controller';
import { UpdateProfileShopService } from './services/updateProfileShop.service';
import { FollowShopController } from './controllers/followShop.controller';
import { ShopFollowerService } from './services/followShop.service';
import { UnFollowShopController } from './controllers/unfollowShop.controller';
import { UnFollowerService } from './services/unfollowShop.service';
import { ListFollowShopController } from './controllers/getAllFollowShop.controller';
import { ListShopFollowerService } from './services/getAllFollowShop.service';
import { GetReviewShopController } from './controllers/getReviewShop.controller';
import { ShopReviewService } from './services/getReviewShop.service';
import { CreateReviewShopController } from './controllers/createReviewShop.controller';
import { CreateShopReviewService } from './services/createReviewShop.service';
import { UpdateReviewShopController } from './controllers/updateReviewShop.controller';
import { UpdateShopReviewService } from './services/updateReviewShop.service';
import { MyReviewShopController } from './controllers/myReviewShop.controller';
import { MyShopReviewService } from './services/myReviewShop.service';
import { DeleteReviewShopController } from './controllers/deleteReviewShop.controller';
import { DeleteReviewService } from './services/deleteReviewShop.service';
import { GetShopClientController } from './controllers/getShopClient.controller';
import { GetShopClientService } from './services/getShopClient.service';
import { GetShopListClientController } from './controllers/getShopListClient.controller';
import { GetShopListClientService } from './services/getShopListClient.service';
import { GetCategoryShopClientController } from './controllers/getCategoryShop.service';
import { GetDetailCategoryShopClientService } from './services/getCategoryShop.service';
import { GetDetailProductShopClientController } from './controllers/getDetailProductShop.controller';
import { GetDetailProductShopClientService } from './services/getDetailProductShop.service';
import { GetAllProductShopClientController } from './controllers/getAllProductShopClient.controller';
import { GetAllProductShopClientService } from './services/getAllProductShopClient.service';
import { GetAllProductHomePageShopClientController } from './controllers/getProductHomePage.controller';
import { GetAllProductHomePageClientService } from './services/getProductHomePage.service';
import { GetAllProductByCategoryGlobalClientController } from './controllers/getAllProductByCategoryGlobal.controller';
import { GetAllProductByCategoryGlobalClientService } from './services/getAllProductByCategoryGlobal.service';

const httpController = [
    GetProfileShopController,
    UpdateShopController,
    FollowShopController,
    UnFollowShopController,
    ListFollowShopController,
    GetReviewShopController,
    CreateReviewShopController,
    UpdateReviewShopController,
    DeleteReviewShopController,
    MyReviewShopController,
    // Public Client
    GetShopListClientController,
    GetCategoryShopClientController,
    GetShopClientController,
    GetDetailProductShopClientController,
    GetAllProductShopClientController,
    GetAllProductHomePageShopClientController,
    GetAllProductByCategoryGlobalClientController


]

const Repository = [
]


const Services = [
    GetProfileShopService,
    UpdateProfileShopService,
    ShopFollowerService,
    UnFollowerService,
    ListShopFollowerService,
    ShopReviewService,
    CreateShopReviewService,
    UpdateShopReviewService,
    MyShopReviewService,
    DeleteReviewService,
    // Public Client
    GetShopClientService,
    GetShopListClientService,
    GetDetailCategoryShopClientService,
    GetDetailProductShopClientService,
    GetAllProductShopClientService,
    GetAllProductHomePageClientService,
    GetAllProductByCategoryGlobalClientService,

    SupabaseService,
    JwtService,
]

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [...httpController],
    providers: [...Services, ...Repository, NotificationGateway],
})
export class ShopModule { }     
