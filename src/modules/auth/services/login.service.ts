import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { compare } from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { LoginDto } from "../dtos/login.dto";
import { AuthRepository } from "../repositories/auth.repository";
const EXPIRE_TIME = 60 * 5;



interface LoginResult {
    id: number;
    roleID: number;
    email: string;
    name: string;
    avatar: string;
}


@Injectable()
export class LoginService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly authRepository: AuthRepository
    ) { }
    private async getUserPermissions(user: any) {
        // Lấy quyền mặc định từ Role
        let permissions = user.Role.permissions
            .filter(rp => rp.isActive)
            .map(rp => rp.permission.code);
        // Nếu là nhân viên của Shop → check override
        // if (user.Role.code === "STAFF_SHOP") {
        //   const staff = await this.prisma.shopStaff.findUnique({
        //     where: { userId: user.id },
        //     include: {
        //       overrides: { include: { permission: true } }
        //     }
        //   });

        //   if (staff) {
        //     const denied = staff.overrides
        //       .filter(o => o.isAllowed === false)
        //       .map(o => o.permission.code);

        //     const allowedExtra = staff.overrides
        //       .filter(o => o.isAllowed === true)
        //       .map(o => o.permission.code);

        //     // Xử lý merge
        //     permissions = permissions.filter(p => !denied.includes(p));
        //     permissions = [...new Set([...permissions, ...allowedExtra])];
        //   }
        // }

        return permissions;
    }

    async login(dto: LoginDto) {
        // Check User tồn tại bởi email
        const user = await this.authRepository.findByEmailAndProvider(dto.email, 'local');
        if (!user) {
            return errorResponse(400, "Tài khoản không tồn tại", "NOT_FOUND")
        } else if (user.status === "BLOCKED") {
            return errorResponse(400, "Tài khoản đã bị vô hiệu hóa", "BLOCKED")
        }


        // Kiểm tra password    

        const verify = await compare(dto.password, user.password);
        if (!verify) {
            return errorResponse(400, "Mật khẩu không đúng", "INCORRECT_PASWORD")
        }


        // Lấy mảng permission code
        const permissions = await this.getUserPermissions(user);
        // const permissions = user.Role.permissions.map(rp => rp.permission.code);

        // Generate Access token and Refresh Token
        const payload = { id: user.id, name: user.name, email: user.email, roleID: user.roleID }

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.SECRET_KEY,
            expiresIn: '5m'
        })

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.SECRET_KEY_REFRESH,
            expiresIn: '1d'
        })

        const { password, ...data } = user
        const result: LoginResult = {
            id: data.id,
            roleID: data.roleID,
            email: data.email,
            name: data?.name ?? "",
            avatar: data?.avatar ?? "",
        }
        const total = {
            user: {
                ...result,
                permissions,
            },
            backendToken: {
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
            }
        }
        return successResponse(200, total, 'Đăng nhập thành công')
    }





}