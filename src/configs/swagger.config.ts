

import { INestApplication, RequestMethod } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function serializeBigInt(obj) {
    return JSON.parse(
        JSON.stringify(obj, (key, value) =>
            typeof value === 'bigint' ? Number(value) : value,
        ),
    );
}

export function setupSwagger(nestApp: INestApplication) {
    console.log('>>> Setting up Swagger');
    const options = new DocumentBuilder()
        .setTitle('EXE')
        .setDescription('AFF Root')
        .setVersion('1.2')
        .addBearerAuth();
    const document = SwaggerModule.createDocument(nestApp, options.build());
    const serializedDocument = serializeBigInt(document);
    SwaggerModule.setup('docs', nestApp, serializedDocument, {
        swaggerOptions: {
            tagsSorter: 'alpha',
            displayOperationId: true,
            displayRequestDuration: true,
            filter: true,
        },
    });
}