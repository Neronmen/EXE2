import { Injectable } from "@nestjs/common";
import { NotificationType, SenderType } from "@prisma/client";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { NotificationGateway } from "src/modules/notifications/gateway/notification.gateway";


@Injectable()
export class ApproveRegisterSellerService {
    constructor(
        private readonly prisma: PrismaService,
        private gateway: NotificationGateway,
    ) { }
    async approveRegister(sellerID: number) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { id: sellerID },
        });

        if (!seller) {
            return errorResponse(400, `Không tìm thấy đơn đăng ký nào có ID này ${sellerID}`)
        }

        if (seller.status !== 'PENDING') {
            return errorResponse(400, `Không thể duyệt đơn đăng ký với trạng thái ${seller.status}`)
        }

        const updatedSeller = await this.prisma.sellerProfile.update({
            where: { id: sellerID },
            data: { status: 'APPROVED' },
        });
        // update role 
        await this.prisma.user.update({
            where: {
                id: seller.userID
            },
            data: {
                roleID: 4
            }
        })
        const notificationData = {
            title: 'Đơn đăng ký nhà bán hàng đã được phê duyệt',
            content: `Tài khoản người bán "${seller.companyName}" của bạn đã được phê duyệt.`,
            type: NotificationType.REGISTER_SELLER,
            senderType: SenderType.SYSTEM,
            receiverID: seller.userID,
            senderID: null,
            isRead: false,
            metadata: {
                sellerID: seller.id,
            }
        };
        await this.prisma.notification.create({ data: notificationData });


        this.gateway.sendToUser(seller.userID, {
            title: 'Đơn đăng ký nhà bán hàng đã được phê duyệt',
            content: `Tài khoản người bán "${seller.companyName}" của bạn đã được phê duyệt.`,
            isRead: false,
            createdAt: new Date(),
            newRoleID: 4,
            metadata: {
                sellerID: seller.id,
            }
        });
        return successResponse(200, 'Duyệt đơn đăng ký thành công')
    }
}