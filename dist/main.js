"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const bodyParser = require("body-parser");
const swagger_config_1 = require("./configs/swagger.config");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = process.env.PORT || configService.get('PORT', 3000);
    const hostname = '0.0.0.0';
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: false
    });
    (0, swagger_config_1.setupSwagger)(app);
    await app.listen(port, hostname);
    console.log(`Server is running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map