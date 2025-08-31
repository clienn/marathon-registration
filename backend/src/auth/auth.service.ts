import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  // Same method used by both GraphQL resolver and REST controller
  login(input: { email: string; password: string }) {
    const email = input.email.toLowerCase().trim();

    return this.users.findByEmail(email).then((user) => {
      // Don't leak which part failed
      if (!user) throw new UnauthorizedException('Invalid credentials');

      const ok = bcrypt.compareSync(input.password, user.passwordHash);
      if (!ok) throw new UnauthorizedException('Invalid credentials');

      const accessToken = this.jwt.sign({
        sub: String(user.id), // stringify if BigInt
        email: user.email,
      });

      // strip passwordHash from the returned user (REST would otherwise expose it)
      const { passwordHash, ...safeUser } = user as any;

      return {
        accessToken,
        user: safeUser,
      };
    });
  }
}