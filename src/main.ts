import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'http://localhost:3000',
    'https://react-ecommerce-six-coral.vercel.app',
    'https://react-ecommerce-oa88vxzno-m-umair58s-projects.vercel.app'
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Memory usage: ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);

}
bootstrap(); 
