import type { AuthorizedType } from "@/composables/types/authorized";
import type { StudentType } from "@/composables/types/student";

export type TutorType = {
  id: number;
  first_name: string;
  last_name: string;
  document_number: string;
  phone_number: string;
  email: string;
  photo: string;
  students?: StudentType[];
  authorizeds?: AuthorizedType[];
};
