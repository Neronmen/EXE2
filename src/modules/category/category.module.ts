import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { CreateCategoryController } from './controllers/create-category-global.controller';
import { CreateCategoryGlobalService } from './services/create-category-global.service';
import { GetListCategoryController } from './controllers/getList-category-global.controller';
import { GetListCategoryGlobalService } from './services/getList-category-global.service';
import { DeleteCategoryController } from './controllers/delete-category-global.controller';
import { DeleteCategoryGlobalService } from './services/delete-category-global.service';
import { UpdateCategoryController } from './controllers/update-category-global.controller';
import { UpdateCategoryGlobalService } from './services/update-category-global.service';
import { CreateCategoryShopController } from './controllers/create-category-shop.controller';
import { GetListCategoryShopController } from './controllers/getList-category-shop.controller';
import { GetListCategoryShopService } from './services/getList-category-shop.service';
import { CreateCategoryShopService } from './services/create-category-shop.service';
import { SupabaseService } from '../common/subapase/supabase.service';
import { UpdateCategoryShopController } from './controllers/update-category-shop.controller';
import { UpdateCategoryShopService } from './services/update-category-shop.service';
import { DeleteCategoryShopController } from './controllers/delete-category-shop.controller';
import { DeleteCategoryShopService } from './services/delete-category-shop.service';
import { GetDetailCategoryShopController } from './controllers/getDetail-category-shop.controller';
import { GetDetailCategoryShopService } from './services/getDetail-category-shop.service';

const httpController = [
    // Category Global
    CreateCategoryController,
    GetListCategoryController,
    DeleteCategoryController,
    UpdateCategoryController,
    // End Category Global

    // Category Shop
    CreateCategoryShopController,
    GetListCategoryShopController,
    UpdateCategoryShopController,
    DeleteCategoryShopController,
    GetDetailCategoryShopController
    // End Category Shop
]

const Repository = [
]


const Services = [
    // Category Global
    CreateCategoryGlobalService,
    GetListCategoryGlobalService,
    DeleteCategoryGlobalService,
    UpdateCategoryGlobalService,
    // End Category Global

    // Category Shop
    CreateCategoryShopService,
    GetListCategoryShopService,
    UpdateCategoryShopService,
    DeleteCategoryShopService,
    GetDetailCategoryShopService,
    // End Category Shop
    SupabaseService,
    JwtService,
]

@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services, ...Repository],
})
export class CategoryModule { }     
