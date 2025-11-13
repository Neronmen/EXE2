import { Server, Socket } from 'socket.io';
export declare class NotificationGateway {
    server: Server;
    private userSockets;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoin(data: {
        userId: number;
    }, client: Socket): void;
    sendToUser(userId: number, payload: any): void;
    sendToUsers(userIds: number[], payload: any): void;
    broadcast(payload: any): void;
}
