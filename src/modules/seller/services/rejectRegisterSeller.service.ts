import { Injectable } from "@nestjs/common";
import { NotificationType, SenderType } from "@prisma/client";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { NotificationGateway } from "src/modules/notifications/gateway/notification.gateway";
import { RejectRegisterSellersDto } from "../dtos/reject-register-seller.dto";


@Injectable()
export class RejectRegisterSellerService {
    constructor(
        private readonly prisma: PrismaService,
        private gateway: NotificationGateway,
    ) { }
    async rejectRegister(sellerID: number, dto: RejectRegisterSellersDto) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { id: sellerID },
        });

        if (!seller) {
            return errorResponse(400, `Không tìm thấy đơn đăng ký nào có ID này ${sellerID}`)
        }

        if (seller.status !== 'PENDING') {
            return errorResponse(400, `Không thể từ chối đơn đăng ký với trạng thái ${seller.status}`)
        }
        const updateData: any = {
            status: "REJECTED"
        }
        if (dto.rejectionReason) {
            updateData.rejectionReason = dto.rejectionReason
        }

        const updatedSeller = await this.prisma.sellerProfile.update({
            where: { id: sellerID },
            data: updateData,
        });
        const notificationData = {
            title: 'Đơn đăng ký nhà bán hàng đã bị từ chối',
            content: `Tài khoản người bán "${seller.companyName}" của bạn không được phê duyệt.`,
            type: NotificationType.REGISTER_SELLER,
            senderType: SenderType.SYSTEM,
            receiverID: seller.userID,
            metadata: {
                sellerID: seller.id,
            },
            senderID: null,
            isRead: false,
        };
        await this.prisma.notification.create({ data: notificationData });


        this.gateway.sendToUser(seller.userID, {
            title: 'Đơn đăng ký nhà bán hàng đã bị từ chối',
            content: `Tài khoản người bán "${seller.companyName}" của bạn không được phê duyệt.`,
            isRead: false,
            createdAt: new Date(),
            newRoleID: 4,
            metadata: {
                sellerID: seller.id,
            }
        });
        return successResponse(200, 'Từ chối đơn đăng ký thành công')
    }
}