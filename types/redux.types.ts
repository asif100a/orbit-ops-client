export interface NoopStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export interface UserPayload {
  id?: string | number;
  email?: string;
  name?: string;
  [key: string]: unknown;
}

export interface AuthState {
  user: UserPayload | null;
  token: string | null;
}

export interface RefreshTokenResponse {
  accessToken?: string;
  refreshToken?: string;
}
