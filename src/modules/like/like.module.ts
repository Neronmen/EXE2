import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

import { SupabaseService } from '../common/subapase/supabase.service';

import { AuthModule } from '../auth/auth.module';

import { NotificationGateway } from '../notifications/gateway/notification.gateway';
import { LikeAndUnlikeProductController } from './controllers/likeProduct.controller';
import { LikeAndUnlikeProductService } from './services/likeProduct.service';
import { CreateCommentController } from './controllers/create-comment-product.controller';
import { CreateProductCommentService } from './services/create-comment-product.service';
import { GetAllCommentController } from './controllers/get-all-comment-product.controller';
import { GetAllCommentService } from './services/get-all-comment-product.service';
import { UpdateCommentController } from './controllers/update-comment-product.controller';
import { UpdateProductCommentService } from './services/update-comment-product.service';
import { DeleteCommentController } from './controllers/delete-comment-product.controller';
import { DeleteProductCommentService } from './services/delete-comment-product.service';

const httpController = [
    LikeAndUnlikeProductController,
    CreateCommentController,
    GetAllCommentController,
    UpdateCommentController,
    DeleteCommentController


]

const Repository = [
]


const Services = [
    LikeAndUnlikeProductService,
    CreateProductCommentService,
    GetAllCommentService,
    UpdateProductCommentService,
    DeleteProductCommentService,
    SupabaseService,
    JwtService,
]

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [...httpController],
    providers: [...Services, ...Repository, NotificationGateway],
})
export class LikeModule { }     
