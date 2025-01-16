import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Users API')
        .setDescription('API for managing users and related data')
        .setVersion('1.0')
        .addTag('Users')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, documentFactory);

    app.useGlobalPipes(new ValidationPipe());
    
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
