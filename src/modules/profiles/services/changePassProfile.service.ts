import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { ChangePassProfileDto } from "../dtos/changePassProfile.dto";
import { hash } from "bcrypt";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { ChangePassProfileRepository } from "../repositories/changePassProfile.repository";

@Injectable()
export class ChangePassProfileService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly changePassRepo: ChangePassProfileRepository
    ) {}

    async changePassProfile(userID: number, data: ChangePassProfileDto, user) {
        const checkUser = await this.prisma.user.findUnique({
            where: { id: userID }
        });

        if (!checkUser) {
            return errorResponse(400, "User này không tồn tại trong hệ thống", "NOT_FOUND_USER");
        }

        if (userID !== user.id) {
            return errorResponse(400, "Không có quyền đổi mật khẩu của UserID này", "NOT_PERMISSION");
        }

        const hashNewPassword = await hash(data.newPassword, 10);
        const userUpdate = await this.changePassRepo.updatePassword(userID, hashNewPassword);

        return successResponse(200, userUpdate, "Thay đổi mật khẩu thành công");
    }
}
