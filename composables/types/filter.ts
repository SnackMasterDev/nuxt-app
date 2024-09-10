export interface FilterApiType {
  field: string;
  value: string | number | boolean;
}

export interface FilterOptionType<T> {
  value: T;
  label: string;
}

export enum StudentFilterEnum {
  NAME = "first_name",
  LAST_NAME = "last_name",
  COURSE = "course.description",
  DOCUMENT_NUMBER = "document_number",
}

export type StudentFilterFieldType = "first_name" | "last_name" | "course.description" | "document_number";

export enum TeacherFiltersEnum {
  NAME = "first_name",
  LAST_NAME = "last_name",
}

export type TeacherFilterFieldType = "name" | "last_name";

export enum TutorFiltersEnum {
  NAME = "first_name",
  LAST_NAME = "last_name",
  DOCUMENT_NUMBER = "document_number",
}

export type TutorFilterFieldType = "name" | "last_name" | "document_number";
