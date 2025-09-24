import { Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SupabaseService } from "src/modules/common/subapase/supabase.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import type { File as MulterFile } from 'multer';

@ApiTags(`${resourcesV1.TEST.parent}`)
@Controller(routesV1.apiversion)
export class TestController {
    constructor(private readonly supabaseService: SupabaseService) { }

    @ApiOperation({ summary: resourcesV1.TEST.displayName })
    @ApiBearerAuth()
    @Post('upload')
    @UseInterceptors(FilesInterceptor('files')) // 'files' must match frontend form-data field
    async test(@UploadedFiles() files: MulterFile[]) {
        if (!files || files.length === 0) {
            return { message: 'Không có files nào' };
        }
        return this.supabaseService.upload(files);
    }
}
