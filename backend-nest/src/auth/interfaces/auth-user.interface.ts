export interface AuthUser {
  id: number;
  username: string;
  email: string;
  // Add other properties here if your JWT payload includes them
  // e.g., roles?: Role[];
}
