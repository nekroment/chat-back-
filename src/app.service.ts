import { CommentEntity } from './entity/comment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './schema/comment.model';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>
  ) {}

  getHello() {
    return "Hello";
  }

  async findAll(): Promise<CommentEntity[]> {
    return await this,this.commentRepository.find();
  }

  async createComment(comment: Comment): Promise<CommentEntity> {
    const newComment = new CommentEntity();
    newComment.description = comment.description;
    newComment.channel = comment.channel;
    newComment.userId = comment.userId;
    return await newComment.save()
  }
}
