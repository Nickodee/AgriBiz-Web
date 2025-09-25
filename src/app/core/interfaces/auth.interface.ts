export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  nationalId: string;
  role: 'FARMER' | 'BUYER' | 'INVESTOR';
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    }
  }
}
