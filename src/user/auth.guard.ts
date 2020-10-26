import { JwtDto } from './../schema/dto/jwt.payload';
import { UserService } from './user.service';
import { CanActivate, ExecutionContext, Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

const jwt = require('jsonwebtoken');

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('UserService') private readonly userSrv: UserService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const {req} = ctx.getContext();
    const payload: JwtDto = await this.userSrv.validateToken(req.headers['access-token']);
    console.log(payload)
    if (!payload) {
      throw new UnauthorizedException();
    }
    req.user = await this.userSrv.findById(payload.id);
    return !!payload;
  }
}
