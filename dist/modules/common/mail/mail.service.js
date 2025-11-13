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
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let MailerService = class MailerService {
    transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    buildTemplate(content, title = 'Thông báo từ hệ thống') {
        return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { 
        font-family: 'Segoe UI', Arial, sans-serif; 
        background: #f4f6f8; 
        margin: 0; 
        padding: 20px; 
        color: #333; 
      }
      .container { 
        max-width: 600px; 
        margin: auto; 
        background: #ffffff; 
        border-radius: 12px; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.08); 
        overflow: hidden; 
        border: 1px solid #e5e7eb;
      }
      .header { 
        background: linear-gradient(90deg, #007bff, #00b4d8); 
        color: #ffffff; 
        padding: 20px; 
        font-size: 20px; 
        font-weight: 600; 
        text-align: center;
        letter-spacing: 0.5px;
      }
      .content { 
        padding: 24px; 
        font-size: 15px; 
        line-height: 1.6; 
        color: #444; 
      }
      .content p { margin: 12px 0; }
      .otp-box {
        background: #f0f7ff;
        border: 1px dashed #007bff;
        color: #007bff;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
        padding: 12px;
        border-radius: 8px;
        margin: 20px 0;
        letter-spacing: 2px;
      }
      .footer { 
        background: #f9fafb; 
        padding: 14px; 
        font-size: 12px; 
        color: #6b7280; 
        text-align: center; 
        border-top: 1px solid #e5e7eb;
      }
      a { color: #007bff; text-decoration: none; }
      a:hover { text-decoration: underline; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">${title}</div>
      <div class="content">
        ${content}
      </div>
      <div class="footer">
        Đây là email tự động, vui lòng không trả lời.<br/>
        &copy; ${new Date().getFullYear()} MySystem
      </div>
    </div>
  </body>
  </html>`;
    }
    sendMail(to, subject, content) {
        const html = this.buildTemplate(content, subject);
        return this.transporter.sendMail({
            from: `"Support" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
            text: content.replace(/<[^>]*>/g, ''),
        });
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailerService);
//# sourceMappingURL=mail.service.js.map