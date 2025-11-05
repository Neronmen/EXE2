import { CartService } from './services/cart.service';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { CartRepository } from './repositories/cart.repository';
import { CartController } from './controllers/cart.controller';
import { Module } from '@nestjs/common';
@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [CartController],
  providers: [CartService, CartRepository],
})
export class CartModule {}

