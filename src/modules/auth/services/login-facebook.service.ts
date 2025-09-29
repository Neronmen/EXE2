import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { compare } from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { AuthRepository } from "../repositories/auth.repository";
import { LoginFacebookDto } from "../dtos/login-facebook.dto";
const EXPIRE_TIME = 60 * 5;



interface LoginResult {
    id: number;
    roleID: number;
    email: string;
    name: string;
    avatar: string;
}


@Injectable()
export class LoginFacebookService {
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

    async loginFaceBook(body: LoginFacebookDto) {

        const { accessTokenFB, userID, email } = body;

        // 1. Gọi Facebook Graph API để verify token và lấy thông tin
        const url = `https://graph.facebook.com/${userID}?fields=id,name,email,picture.type(large)&access_token=${accessTokenFB}`;
        const res = await fetch(url);
        const fbUser = await res.json();

        if (fbUser.error) {
            throw new UnauthorizedException("Invalid Facebook token");
        }

        // 2. Lấy email (nếu user không chia sẻ email thì dùng email FE gửi lên)
        const userEmail = fbUser.email || email;
        if (!userEmail) {
            return errorResponse(400, "Không lấy được email từ Facebook", "NO_EMAIL");
        }


        // // Check User tồn tại bởi email
        let user: any = await this.authRepository.findByEmailAndProvider(userEmail, 'facebook');
        if (!user) {
            console.log(fbUser.id)
            console.log(fbUser.picture.data.url)
            const dataNewUserDB = {
                email: userEmail,
                name: fbUser.name,
                oauthID: fbUser.id,
                avatar: fbUser.picture.data.url
            }
            await this.authRepository.createNewUserFacebook(dataNewUserDB);
            user = await this.authRepository.findByEmailAndProvider(userEmail, 'facebook');
        } else {
            // 2. User đã tồn tại
            if (user.status === "BLOCKED") {
                return errorResponse(400, "Tài khoản đã bị khóa", "BLOCKED");
            }
            if (fbUser.picture?.data?.url && user.avatar !== fbUser.picture.data.url) {
                await this.authRepository.updateUserAvatar(user.id, fbUser.picture.data.url);
                user.avatar = fbUser.picture.data.url;
            }
        }


        // Lấy mảng permission code
        const permissions = await this.getUserPermissions(user);


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