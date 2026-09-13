import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service.js';
import { PostsController } from './posts.controller.js';
import { Post } from './entities/post.entity.js';
import { CategoriesModule } from '../categories/categories.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CategoriesModule, // Category exist kore kina check korar jonne dorkar
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
