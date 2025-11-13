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
exports.RefreshService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const EXPIRE_TIME = 60 * 5;
let RefreshService = class RefreshService {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async refresh(reqUser) {
        const payload = { sub: reqUser.sub, id: reqUser.id, name: reqUser.fullname, email: reqUser.email, roleID: reqUser.roleID, };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.SECRET_KEY,
            expiresIn: '5m'
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.SECRET_KEY_REFRESH,
            expiresIn: '1d'
        });
        return {
            accessToken,
            refreshToken,
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
        };
    }
};
exports.RefreshService = RefreshService;
exports.RefreshService = RefreshService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], RefreshService);
//# sourceMappingURL=refresh-token.service.js.map