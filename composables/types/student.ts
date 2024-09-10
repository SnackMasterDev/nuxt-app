import type { AuthorizedType } from "@/composables/types/authorized";
import type { CourseType } from "@/composables/types/course";
import type { TutorType } from "@/composables/types/tutor";
import type { UserType } from "@/composables/types/user";

export type StudentType = {
  id: number;
  first_name: string;
  last_name: string;
  document_number: string;
  course: CourseType;
  tutor: TutorType;
  authorized: AuthorizedType;
  status: string;
  leave_alone: boolean;
} & UserType;
