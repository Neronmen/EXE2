import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,  // ví dụ: smtp.gmail.com
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false, // true nếu port 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    private buildTemplate(content: string, title: string = 'Thông báo từ hệ thống'): string {
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
    sendMail(to: string, subject: string, content: string,) {
        const html = this.buildTemplate(content, subject);
        return this.transporter.sendMail({
            from: `"Support" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
            text: content.replace(/<[^>]*>/g, ''),
        });
    }
}
