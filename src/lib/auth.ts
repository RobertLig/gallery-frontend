import api from './api';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'USER' | 'ADMIN';
  locale: 'en' | 'pl';
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export const loginWithGoogle = async (idToken: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/google', { idToken });
  return response.data;
};

export const refreshAuth = async (): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/refresh');
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};

export const updateUserProfile = async (phone?: string): Promise<User> => {
  const response = await api.patch<User>('/users/me', { phone });
  return response.data;
};
