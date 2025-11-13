export declare class MailerService {
    private transporter;
    constructor();
    private buildTemplate;
    sendMail(to: string, subject: string, content: string): any;
}
