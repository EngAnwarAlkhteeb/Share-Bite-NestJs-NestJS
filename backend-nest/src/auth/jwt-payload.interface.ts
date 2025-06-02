export interface JwtPayload {
  sub: number; // User ID
  username: string;
  email: string; // If you include email in your JWT payload
}
