// src/posts/posts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { CategoriesService } from '../categories/categories.service.js';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    private readonly categoriesService: CategoriesService, // onno module er service inject
  ) {}

  async create(createPostDto: CreatePostDto) {
    //check exists category
    await this.categoriesService.findOne(createPostDto.categoryId);

    const post = this.postRepo.create(createPostDto);
    return this.postRepo.save(post);
  }

  findAll() {
    return this.postRepo.find(); // eager: true thakar jonne category o shathe ashbe
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post ${id} not found`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);

    if (updatePostDto.categoryId) {
      await this.categoriesService.findOne(updatePostDto.categoryId);
    }

    Object.assign(post, updatePostDto);
    return this.postRepo.save(post);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    await this.postRepo.remove(post);
    return { message: `Post ${id} delete successfully` };
  }
}
