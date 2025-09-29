import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

const EXPIRE_TIME = 60 * 5;

@Injectable()
export class RefreshService {
    constructor(
        private readonly jwtService: JwtService
    ) { }
    async refresh(reqUser) {
        const payload = { sub: reqUser.sub, id: reqUser.id, name: reqUser.fullname, email: reqUser.email, roleID: reqUser.roleID, }

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.SECRET_KEY,
            expiresIn: '5m'
        })

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.SECRET_KEY_REFRESH,
            expiresIn: '1d'
        })
        return {
            accessToken,
            refreshToken,
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
        }
    }
}