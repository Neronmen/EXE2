import { EditProfileDto } from "../dtos/editProfile.dto";
import type { File as MulterFile } from 'multer';
import { EditProfileService } from "../services/editProfile.service";
export declare class EditProfileController {
    private readonly editProfileService;
    constructor(editProfileService: EditProfileService);
    editProfile(files: {
        avatar?: MulterFile[];
    }, dto: EditProfileDto, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
