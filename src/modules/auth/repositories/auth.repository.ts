import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class AuthRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByEmailAndProvider(email: string, oauthProvider: string) {
        return this.prisma.user.findUnique({
            where: {
                email_oauthProvider: {
                    email,
                    oauthProvider,
                },
                isDeleted: false
            },
            include: {
                Role: {
                    include: {
                        permissions: {
                            include: { permission: true },
                        },
                    },
                },
            },
        });
    }


    async findByID(id: number) {
        return this.prisma.user.findUnique({
            where: { id: id, isDeleted: false },
            include: {
                Role: { include: { permissions: { include: { permission: true } } } },
            },
        })
    }


    async createNewUser(data) {

        return this.prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                name: data.name,
                roleID: 6,
                oauthProvider: "local",

            }
        })
    }

    async createNewUserFacebook(data) {
        return this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                roleID: 6,
                oauthProvider: "facebook",
                oauthID: data.oauthID,
                avatar: data.avatar
            }

        })
    }

    async createPasswordReset(userID: number, otpHash: string) {
        await this.prisma.passwordReset.create({
            data: {
                userID,
                otpHash,
                expiresAt: new Date(Date.now() + 3 * 60 * 1000)

            }
        })
    }


    async getPasswordReset(userID: number) {
        return await this.prisma.passwordReset.findFirst({
            where: {
                userID,
                expiresAt: { gt: new Date() }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async updateAttempt(recordID: number) {
        await this.prisma.passwordReset.update({
            where: { id: recordID },
            data: { attempt: { increment: 1 } }
        });
    }

    async updateUsed(userID: number) {
        await this.prisma.passwordReset.update({
            where: { userID },
            data: { used: true }
        });
    }
    async updateUserAvatar(userID: number, newAvatar) {
        await this.prisma.user.update({
            where: { id: userID },
            data: { avatar: newAvatar }
        });
    }

    async updatePasswordByUser(userID: number, hashPassword: string) {
        await this.prisma.user.update({
            where: { id: userID },
            data: { password: hashPassword },
        });

    }


    async deleteRecordPasswordByUser(userID: number) {
        await this.prisma.passwordReset.deleteMany({
            where: { userID },
        });
    }

    async lastOTPByUser(userID: number) {
        return await this.prisma.passwordReset.findFirst({
            where: { userID },
            orderBy: { createdAt: 'desc' },
        });
    }


}
