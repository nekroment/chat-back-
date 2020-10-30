import { ConvoLinkModule } from './modules/convoLink/convoLink.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { MessagesModule } from './modules/messages/messages.module';
import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-graphql-dataloader'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    MessagesModule,
    ConversationModule,
    ConvoLinkModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: (context) => {
        return {req: context.req, connection: context.connection}
      },
      installSubscriptionHandlers: true
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor
    } 
  ]
})
export class AppModule {}
