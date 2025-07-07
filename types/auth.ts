export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}