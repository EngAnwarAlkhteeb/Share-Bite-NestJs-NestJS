export type SignUpFormState =
  | {
      data: {
        username?: string;
        email?: string;
        password?: string;
      };
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
