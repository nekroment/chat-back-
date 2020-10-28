import { UserService } from './../modules/user/user.service';
import { JwtDto } from '../schema/dto/jwt.payload';
import { CanActivate, ExecutionContext, Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import get from 'lodash.get';
import set from 'lodash.set';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('UserService') private readonly userSrv: UserService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req, connection } = ctx.getContext();
    const headers = get(req, 'headers') || get(connection, 'context', {});
    const payload: JwtDto = await this.userSrv.validateToken(headers['access-token']);
    if (!payload) {
      throw new UnauthorizedException();
    }
    const user = await this.userSrv.findById(payload._id);
    set(ctx.getContext(), 'req.user', user);

    return !!payload;
  }
}
