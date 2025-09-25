import { Body, Controller, Param, Patch, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { EditProfileDto } from "../dtos/editProfile.dto";
import type { File as MulterFile } from 'multer';
import { EditProfileService } from "../services/editProfile.service";
@ApiTags(
    `${resourcesV1.EDIT_PROFILE.parent}`,
)
@Controller(routesV1.apiversion)
export class EditProfileController {
    constructor(
        private readonly editProfileService: EditProfileService
    ) { }
    @ApiOperation({ summary: resourcesV1.EDIT_PROFILE.displayName })
    @ApiBearerAuth()
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: "avatar", maxCount: 1 },
        ])
    )
    @UseGuards(JWTGuard)
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                name: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                avatar: { type: "string", format: "binary" },
            },
        },
    })
    @Patch(routesV1.profile.root)
    async editProfile(@UploadedFiles()
    files: {
        avatar?: MulterFile[];
    }, @Body() dto: EditProfileDto, @GetUser() user) {
        return await this.editProfileService.editProfile(files, dto, user)
    }
}