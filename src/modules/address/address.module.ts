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
import { GetDefaultAddressController } from './controllers/getDefaultAddress.controller';
import { GetDefaultAddressService } from './services/getDefaultAddress.service';
import { SetDefaultAddressController } from './controllers/setDefaultAddress.controller';
import { SetDefaultAddressService } from './services/setDefaultAddress.service';


const httpController = [
    GetDefaultAddressController,
    GetAllAddressController,
    CreateAddressController,
    UpdateAddressController,
    DeleteAddressController,
    GetDetailAddressController,
    SetDefaultAddressController
]

const Repository = [
    AddressRepository
]


const Services = [
    GetDefaultAddressService,
    GetAllAddressService,
    CreateAddressService,
    UpdateAddressService,
    DeleteAddressService,
    GetDetailAddressService,
    SetDefaultAddressService,
    JwtService
]

@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services, ...Repository],
})
export class AddressModule { }     
