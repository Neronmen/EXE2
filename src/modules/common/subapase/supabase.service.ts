import { Injectable, BadRequestException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { File as MulterFile } from 'multer';

@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient;
    constructor() {
        this.supabase = createClient(
            process.env.SUPABASE_URL as string,
            process.env.SUPABASE_KEY as string,
        );
    }
    async upload(files: MulterFile[]) {
        const uploaded: string[] = [];

        for (const file of files) {
            const filePath = `uploads/${Date.now()}-${file.originalname}`;
            const { error } = await this.supabase.storage
                .from('uploads')
                .upload(filePath, file.buffer, {
                    contentType: file.mimetype,
                });

            if (error) throw new BadRequestException(error.message);
            const { data: urlData } = this.supabase.storage
                .from('uploads')
                .getPublicUrl(filePath);

            uploaded.push(urlData.publicUrl);
        }

        return uploaded;
    }
}
