import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable global validation using ValidationPipe
    app.useGlobalPipes(new ValidationPipe());

    // Fix CORS
    app.enableCors({
        origin: ['https://hcinterior.in', 'https://www.hcinterior.in', 'https://staging.hcinterior.in', 'http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    const config = new DocumentBuilder()
        .setTitle('High Creation API')
        .setDescription('API documentation for your application.')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(9999);
}

bootstrap();
