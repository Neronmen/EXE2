"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProfileService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const supabase_service_1 = require("../../common/subapase/supabase.service");
const profile_repository_1 = require("../repositories/profile.repository");
let EditProfileService = class EditProfileService {
    supabase;
    profileRepo;
    constructor(supabase, profileRepo) {
        this.supabase = supabase;
        this.profileRepo = profileRepo;
    }
    async editProfile(files, dto, user) {
        let dataUpdate = {};
        if (dto.name)
            dataUpdate.name = dto.name;
        if (dto.phone)
            dataUpdate.phone = dto.phone;
        if (files && files.avatar && files.avatar.length > 0) {
            const avatar = await this.supabase.upload(files.avatar);
            dataUpdate.avatar = avatar[0];
        }
        if (dataUpdate.length === 0) {
            return (0, response_util_1.errorResponse)(400, "Không có gì để Update", "NOT_DATA_UPDATE");
        }
        const userUpdate = await this.profileRepo.updateProfile(user.id, dataUpdate);
        return (0, response_util_1.successResponse)(200, userUpdate, "Cập nhật  profile thành công");
    }
};
exports.EditProfileService = EditProfileService;
exports.EditProfileService = EditProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        profile_repository_1.ProfileRepository])
], EditProfileService);
//# sourceMappingURL=editProfile.service.js.map