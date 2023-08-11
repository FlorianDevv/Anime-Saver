import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimesaverModule } from './animesaver/animesaver.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Users } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { Anime } from './animesaver/anime.entity';
import { AnimeSave } from './animesaver/animesave.entity';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      entities: [Users, Anime, AnimeSave],
      synchronize: true,
    }),
    AnimesaverModule,
    TypeOrmModule.forFeature([Users, Anime, AnimeSave]),
    AuthModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
