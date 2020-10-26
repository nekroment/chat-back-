import { UserEntity } from './../entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]),],
    controllers: [],
    providers: [UserService, UserResolver],
  })
  export class UserModule {}
  