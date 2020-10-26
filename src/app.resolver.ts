import { AppService } from './app.service';
import { Resolver, Query, Mutation  } from "@nestjs/graphql";
import { Comment } from "./schema/comment.model";
import { Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './user/auth.guard';


@Resolver()
@UseGuards(AuthGuard)
export class AppResolver {
  constructor(
    private appService: AppService
  ) {}

  @Mutation(() => Comment)
  async createComment(@Body() body) {
      const newComment = new Comment()
      console.log(body);
      // newComment.description ="test";
      // newComment.channel ="test channel";
      // newComment.userId = '2'
      // return await this.appService.createComment(newComment);
  }

  @Query(() => [Comment])
  async getAllComments() {
      return await this.appService.findAll();
  }
  
}
