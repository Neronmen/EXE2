// notification.gateway.ts
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: { origin: '*' },
})
export class NotificationGateway {
    @WebSocketServer()
    server: Server;

    private userSockets: Map<number, Set<string>> = new Map();

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        for (const [userId, sockets] of this.userSockets.entries()) {
            if (sockets.has(client.id)) {
                sockets.delete(client.id);
                if (sockets.size === 0) {
                    this.userSockets.delete(userId);
                }
                break;
            }
        }
    }

    @SubscribeMessage('join')
    handleJoin(@MessageBody() data: { userId: number }, @ConnectedSocket() client: Socket) {
        const { userId } = data;
        if (!this.userSockets.has(userId)) {
            this.userSockets.set(userId, new Set());
        }
        this.userSockets.get(userId)!.add(client.id);
        console.log(`User ${userId} joined with socket ${client.id}`);
    }

    // hàm gửi cho 1 user
    sendToUser(userId: number, payload: any) {
        const sockets = this.userSockets.get(userId);
        if (!sockets) return;
        sockets.forEach((socketId) => {
            this.server.to(socketId).emit('notification', payload);
        });
    }

    // gửi cho nhiều user
    sendToUsers(userIds: number[], payload: any) {
        userIds.forEach((id) => this.sendToUser(id, payload));
    }

    // broadcast tất cả
    broadcast(payload: any) {
        this.server.emit('notification', payload);
    }
}
