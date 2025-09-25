import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { EditProfileDto } from "../dtos/editProfile.dto";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
import { ProfileRepository } from "../repositories/profile.repository";


@Injectable()
export class EditProfileService {
    constructor(
        private readonly supabase: SupabaseService,
        private readonly profileRepo: ProfileRepository
    ) { }
    async editProfile(files: any, dto: EditProfileDto, user) {
        let dataUpdate: any = {};
        if (dto.name) dataUpdate.name = dto.name;
        if (dto.phone) dataUpdate.phone = dto.phone;
        // Upload ảnh 
        if (files && files.avatar.length > 0) {
            const avatar = await this.supabase.upload(files.avatar);
            dataUpdate.avatar = avatar[0]
        }
        if (dataUpdate.length === 0) {
            return errorResponse(400, "Không có gì để Update", "NOT_DATA_UPDATE");
        }
        const userUpdate = this.profileRepo.updateProfile(user.id, dataUpdate)
        return successResponse(200, userUpdate, "Cập nhật  profile thành công");
    }
}