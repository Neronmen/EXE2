import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PermissionModule } from './modules/permission/permission.module';
import { NotificationModule } from './modules/notifications/notification.module';
import { ProfileModule } from './modules/profiles/profile.module';
import { AddressModule } from './modules/address/address.module';
import { PaymentModule } from './modules/payment/payment.module';


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
    PaymentModule
    /* ---------------- End Module---------------- */



  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
