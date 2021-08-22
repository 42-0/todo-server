import { userRole } from '../../user/entities/user.entity';

export interface JwtInfo {
  id: number;
  email: string;
  roles: userRole;
  iat: number;
  exp: number;
}
