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
exports.GetListCategoryGlobalService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const prisma_service_1 = require("../../../libs/prisma/prisma.service");
let GetListCategoryGlobalService = class GetListCategoryGlobalService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getListCategoryGlobal(filter) {
        const { search, page = "1", limit = "10" } = filter;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);
        let items = [];
        let total = 0;
        if (search) {
            const searchTerm = `%${search}%`;
            items = await this.prisma.$queryRaw `
                SELECT *
                FROM "CategoryGlobal"
                WHERE unaccent("name") ILIKE unaccent(${searchTerm})
                LIMIT ${take} OFFSET ${skip};
                `;
            const totalResult = await this.prisma.$queryRaw `
                SELECT COUNT(*)::int AS count
                FROM "CategoryGlobal"
                WHERE unaccent("name") ILIKE unaccent(${searchTerm});
                `;
            total = totalResult[0]?.count ?? 0;
        }
        else {
            [items, total] = await Promise.all([
                this.prisma.categoryGlobal.findMany({
                    skip,
                    take,
                }),
                this.prisma.categoryGlobal.count(),
            ]);
        }
        return (0, response_util_1.successResponse)(200, {
            total,
            page: +page,
            limit: +limit,
            totalPages: Math.ceil(total / +limit),
            items,
        }, "Lấy danh sách danh mục toàn cục thành công");
    }
};
exports.GetListCategoryGlobalService = GetListCategoryGlobalService;
exports.GetListCategoryGlobalService = GetListCategoryGlobalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GetListCategoryGlobalService);
//# sourceMappingURL=getList-category-global.service.js.map