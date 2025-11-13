import { EditProfileDto } from "../dtos/editProfile.dto";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
import { ProfileRepository } from "../repositories/profile.repository";
export declare class EditProfileService {
    private readonly supabase;
    private readonly profileRepo;
    constructor(supabase: SupabaseService, profileRepo: ProfileRepository);
    editProfile(files: any, dto: EditProfileDto, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
