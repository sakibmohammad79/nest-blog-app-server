// src/posts/dto/create-post.dto.ts
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'Content is required' })
  @IsString()
  content: string;

  @IsInt({ message: 'categoryId number is required' })
  categoryId: number;
}
