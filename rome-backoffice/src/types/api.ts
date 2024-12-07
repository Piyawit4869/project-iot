export interface LoginRequest {
  user: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export interface UpdateUserProfileRequest {
  name: string;
  email: string;
}

export interface UpdateUserProfileResponse {
  success: boolean;
}
