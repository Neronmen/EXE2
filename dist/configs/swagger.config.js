"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
function serializeBigInt(obj) {
    return JSON.parse(JSON.stringify(obj, (key, value) => typeof value === 'bigint' ? Number(value) : value));
}
function setupSwagger(nestApp) {
    console.log('>>> Setting up Swagger');
    const options = new swagger_1.DocumentBuilder()
        .setTitle('EXE')
        .setDescription('AFF Root')
        .setVersion('1.2')
        .addBearerAuth();
    const document = swagger_1.SwaggerModule.createDocument(nestApp, options.build());
    const serializedDocument = serializeBigInt(document);
    swagger_1.SwaggerModule.setup('docs', nestApp, serializedDocument, {
        swaggerOptions: {
            tagsSorter: 'alpha',
            displayOperationId: true,
            displayRequestDuration: true,
            filter: true,
        },
    });
}
//# sourceMappingURL=swagger.config.js.map