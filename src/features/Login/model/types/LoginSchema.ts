export interface LoginSchema {
  isLoading: boolean;
  error?: string;
}

export interface LoginSubmitData {
  email: string;
  password: string;
}
