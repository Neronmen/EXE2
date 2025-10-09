import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PermissionModule } from './modules/permission/permission.module';
import { NotificationModule } from './modules/notifications/notification.module';
import { ProfileModule } from './modules/profiles/profile.module';
import { AddressModule } from './modules/address/address.module';
import { SellerModule } from './modules/seller/seller.module';
import { ShopModule } from './modules/shop/shop.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/products/product.module';
import { LikeModule } from './modules/like/like.module';

@Module({
  imports: [
    // Config ENV 
    ConfigModule.forRoot({
      isGlobal: true
    }),

    /* ----------------Module---------------- */
    AuthModule,
    PermissionModule,
    NotificationModule,
    ProfileModule,
    AddressModule,
    SellerModule,
    ShopModule,
    CategoryModule,
    ProductModule,
    LikeModule
    /* ---------------- End Module---------------- */



  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
