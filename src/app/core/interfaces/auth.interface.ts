export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  nationalId: string;
  role: 'FARMER' | 'BUYER' | 'INVESTOR';
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface RegisterResponse extends ApiResponse<{
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }
}> {}

export interface LoginResponse extends ApiResponse<{
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }
}> {}
