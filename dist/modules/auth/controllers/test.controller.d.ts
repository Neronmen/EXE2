import { SupabaseService } from "src/modules/common/subapase/supabase.service";
import type { File as MulterFile } from 'multer';
export declare class TestController {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    test(files: MulterFile[]): Promise<string[] | {
        message: string;
    }>;
}
