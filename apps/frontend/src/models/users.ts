export interface WelcomeForm {
  nickname: string;
  like: string;
}

export interface User {
  created_at: string | null;
  id: number;
  like: string;
  nickname: string;
  user_id: string;
}
