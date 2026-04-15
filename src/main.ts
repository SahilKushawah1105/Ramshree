import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for frontend

  // Simple seed logic for the first admin
  const usersService = app.get(UsersService);
  const admin = await usersService.findByEmail('admin@ramshree.com');
  if (!admin) {
    await usersService.create({
      email: 'admin@ramshree.com',
      password: 'adminpassword',
      role: 'admin',
    });
    console.log('Admin user created: admin@ramshree.com / adminpassword');
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
