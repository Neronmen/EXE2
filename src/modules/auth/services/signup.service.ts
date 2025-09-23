import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { compare, hash } from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { AuthRepository } from "../repositories/auth.repository";
import { SignUpDto } from "../dtos/signUp.dto";
const EXPIRE_TIME = 3600 * 1000 * 24 * 7;


@Injectable()
export class SignUpService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly authRepository: AuthRepository
    ) { }

    async signup(dto: SignUpDto) {

        // 1. Kiểm tra email đã tồn tại chưa
        const existUser = await this.authRepository.findByEmailAndProvider(dto.email, "local")
        if (existUser) {
            return errorResponse(400, "Email đã được sử dụng cho tài khoản local", "EMAIL_EXIST")
        }
        // 2. HashPassword
        const hashPassword = await hash(dto.password, 10);
        dto.password = hashPassword
        // 3. Tạo user mới
        const newUser = await this.authRepository.createNewUser(dto)
        // const result = {
        //     id: newUser.id,
        //     name: newUser.name,
        //     email: newUser.email,
        //     avatar: newUser.avatar,
        //     roleID: newUser.roleID,
        // };
        return successResponse(200, 'Tạo tài khoản thành công, vui lòng đăng nhập để tiếp tục',)
    }





}