export interface PostProps {
  id?: string;
  user_id: string;
  slug: string;
  title: string;
  role: string;
  type: string;
  companyName: string;
  locationType: string;
  location: string;
  description?: string;
  salary: string;
  created_At: string;
  updated_At: string;
}

export type FormDataValues = Omit<
  PostProps,
  "id" | "created_At" | "updated_At"
> & {
  salary: string;
};
