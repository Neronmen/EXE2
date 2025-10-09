import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../common/subapase/supabase.service';
import { AuthModule } from '../auth/auth.module';
import { NotificationGateway } from '../notifications/gateway/notification.gateway';
import { CreateProductController } from './controllers/create-product.controller';
import { CreateProductService } from './services/create-product.service';
import { GetAllProductController } from './controllers/get-all-product.controller';
import { GetAllProductService } from './services/get-all-product.service';
import { GetDetailProductController } from './controllers/get-detail-product.controller';
import { SellerProductService } from './services/get-detail-product.service';
import { UpdateProductController } from './controllers/update-product.controller';
import { UpdateProductService } from './services/update-product.service';
import { AddImageProductController } from './controllers/add-new-image-product.controller';
import { AddImageProductService } from './services/add-new-image-product.service';
import { SetMainImageProductController } from './controllers/set-main-image-product.controller';
import { SetMainImageProductService } from './services/set-main-image-product.service';
import { DeleteImageProductController } from './controllers/delete-image-product.controller';
import { DeleteImageProductService } from './services/delete-image-product.service';
import { ChangeStatusProductController } from './controllers/change-status-product.controller';
import { ChangeStatusProductService } from './services/change-status-product.service';
import { DeleteProductController } from './controllers/delete-product.controller';
import { DeleteProductService } from './services/delete-product.service';
import { ViewUsersLikeProductProductController } from './controllers/view-users-like-product.controller';
import { ViewUserLikeProductService } from './services/view-users-like-product.service';

const httpController = [
    CreateProductController,
    GetAllProductController,
    GetDetailProductController,
    UpdateProductController,
    AddImageProductController,
    SetMainImageProductController,
    DeleteImageProductController,
    ChangeStatusProductController,
    DeleteProductController,
    ViewUsersLikeProductProductController
]

const Repository = [
]


const Services = [
    CreateProductService,
    GetAllProductService,
    SellerProductService,
    UpdateProductService,
    AddImageProductService,
    SetMainImageProductService,
    DeleteImageProductService,
    ChangeStatusProductService,
    DeleteProductService,
    ViewUserLikeProductService,
    SupabaseService,
    JwtService,
]

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [...httpController],
    providers: [...Services, ...Repository, NotificationGateway],
})
export class ProductModule { }     
