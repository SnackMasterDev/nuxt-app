import type { RoleEnum } from "composables/enum";

export type UserType = {
  id?: number;
  name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  role?: RoleEnum;
};
