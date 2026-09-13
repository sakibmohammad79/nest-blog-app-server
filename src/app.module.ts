import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CategoriesModule } from './categories/categories.module.js';
import { PostsModule } from './posts/posts.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // .env shobjaigay access korte parar jonno
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true, // proti module er entity auto load hobe
        synchronize: true, // DEV ONLY, table auto create/update kore. Production e false rakhte hobe
      }),
      inject: [ConfigService],
    }),
    CategoriesModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
