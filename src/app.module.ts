import { UserEntity } from './entity/user.entity';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { CommentEntity } from './entity/comment.entity';
import { AppResolver } from './app.resolver';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([CommentEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: (({req}) => ({headers: req.headers}))
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, UserService],
})
export class AppModule {}
