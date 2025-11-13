import { RefreshService } from "../services/refresh-token.service";
export declare class RefreshController {
    private readonly refreshService;
    constructor(refreshService: RefreshService);
    refresh(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
}
