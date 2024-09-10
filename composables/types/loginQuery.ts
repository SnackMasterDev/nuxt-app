import type { UserType } from "@/composables/types/user";

export type LoginRequestType = {
  email: string;
  password: string;
  rememberPassword?: boolean;
};

export type LoginResponseType = {
  token: string;
  expires_in: number;
  user: UserType;
  error?: string;
};
