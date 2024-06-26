import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  authHeader: string;
  apiToken: string;

  constructor(private readonly config: ConfigService) {
    this.authHeader = this.config.getOrThrow('auth.header');
    this.apiToken = this.config.getOrThrow('auth.apiToken');
  }

  use(req: Request, res: Response, next: (error?: any) => void) {
    const providedAuthToken = req.headers[this.authHeader];
    if (!providedAuthToken || this.apiToken !== providedAuthToken) {
      throw new UnauthorizedException();
    }

    next();
  }
}
