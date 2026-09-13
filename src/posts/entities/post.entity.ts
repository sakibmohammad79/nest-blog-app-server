import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity.js';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  // Onek Post ekta Category er hote pare (Many-to-One relation)
  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'categoryId' }) // DB te "categoryId" column hishebe thakbe
  category: Category;

  @Column()
  categoryId: number; // relation er id ta shorashori access korar jonne

  @CreateDateColumn()
  createdAt: Date;
}
