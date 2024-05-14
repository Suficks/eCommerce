export interface LoginSchema {
  isLoading: boolean;
  error?: string;
}

export interface LoginSubmitData {
  username?: string;
  email: string;
  password: string;
}
