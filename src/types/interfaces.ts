export interface ISignIn {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface IUser {
  email: string;
  password: string;
  name?: string;
}

export interface IPageInfo {
  pageName: string;
  level?: number;
  pageNumber?: number;
  aggregatedNumber?: number;
}
