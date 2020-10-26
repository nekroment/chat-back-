import { MessagesModule } from './comments/messages.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    MessagesModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: (({req}) => ({headers: req.headers}))
    }),
  ],
  controllers: [AppController],
  providers: [AppService ]
})
export class AppModule {}
