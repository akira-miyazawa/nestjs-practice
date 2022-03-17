import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // リクエストのどの部分にjwtが使用されているか
      ignoreExpiration: false, // トークンの有効期限を考慮するかどうか(エラーにしたいのでfalse)
      secretOrKey: 'secretKey123',
    });
  }

  // 処理の中で自動的に呼ばれるものでvalidateで固定
  async validate(payload: { id: string; username: string }): Promise<User> {
    const { id, username } = payload;
    const user = await this.userRepository.findOne({ id, username });
    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
