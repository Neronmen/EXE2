import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { GetAllAddressController } from './controllers/getAllAddress.controller';
import { GetAllAddressService } from './services/getAllAddress.service';
import { AddressRepository } from './repository/address.repository';
import { CreateAddressController } from './controllers/createAddress.controller';
import { CreateAddressService } from './services/createAddress.service';
import { UpdateAddressController } from './controllers/updateAddress.controller';
import { UpdateAddressService } from './services/updateAddress.service';
import { DeleteAddressController } from './controllers/deleteAddress.controller';
import { DeleteAddressService } from './services/deleteAddress.service';
import { GetDetailAddressController } from './controllers/getDetailAddress.controller';
import { GetDetailAddressService } from './services/getDetailAddress.service';


const httpController = [
    GetAllAddressController,
    CreateAddressController,
    UpdateAddressController,
    DeleteAddressController,
    GetDetailAddressController
]

const Repository = [
    AddressRepository
]


const Services = [
    GetAllAddressService,
    CreateAddressService,
    UpdateAddressService,
    DeleteAddressService,
    GetDetailAddressService,
    JwtService
]

@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services, ...Repository],
})
export class AddressModule { }     
