import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  if (process.env.NODE_ENV !== 'production') {
    const app = await NestFactory.create(AppModule, { rawBody: true });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    app.enableCors({
      origin: true,
      credentials: true,
    });

    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`Servidor rodando na porta: ${port}`);
  }
}
bootstrap();

export default async function (req: any, res: any) {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  app.enableCors({ 
    origin: true, 
    credentials: true 
  });
  
  await app.init();
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
}