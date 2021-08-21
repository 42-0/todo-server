export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role: userRole;
  profileImage?: string;
  provider?: userProvider;
  uuid: string;
  isChecked: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export enum userRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum userProvider {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  NAVER = 'NAVER',
  KAKAO = 'KAKAO',
}
