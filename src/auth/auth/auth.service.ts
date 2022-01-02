import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

const users: User[] = [
  {
    id: 1,
    username: 'user1@user.com',
    password: '$2b$10$9712RjZU4YWGJlRplSGnVO5MBo5qrNdt47RQsvYQNScuahR7FWEMO',
    role: 'admin',
  },
  {
    id: 2,
    username: 'user2@user.com',
    password: '$2b$10$vrHKS7xIvuPIjhjjdHoekO.cpdv4.Ei1JaFuCIxoSFksUFpf.9Ywi',
    role: 'user',
  },
  {
    id: 3,
    username: 'user3@user.com',
    password: '$2b$10$YPDTF1xVUdb0aQu0FGWvFuwZpqOjozimF.OsOdEnDU2TS.fFVSJwq',
    role: 'user',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(username: string, password: string): string {
    const user = this.validateCredentials(username, password);

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  validateCredentials(username: string, password: string) {
    const user = users.find(
      (u) =>
        u.username === username && bcrypt.compareSync(password, u.password),
    );

    if (!user) {
      throw new Error('User not found: ' + username);
    }

    return user;
  }
}
