import type { File as MulterFile } from 'multer';
export declare class SupabaseService {
    private supabase;
    constructor();
    upload(files: MulterFile[]): Promise<string[]>;
}
