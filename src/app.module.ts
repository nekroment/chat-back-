import { MessagesModule } from './messages/messages.module';
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
      context: (context) => {
        // console.log('----------------------');
        // console.log(context);
        // console.log('++++++++++++++++++++++');
        return {req: context.req, connection: context.connection}
      },
      installSubscriptionHandlers: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService ]
})
export class AppModule {}
