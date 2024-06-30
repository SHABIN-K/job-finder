"use server";

import { nanoid } from "nanoid";
import { gql } from "@apollo/client";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import client from "@/config/api";
import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import { FormDataValues } from "@/types";

const UPDATE_POST_MUTATION = gql`
  mutation UPDATE_POST($id: ID!, $input: UpdateJobInput!) {
    update_post_by_pk(pk_columns: { id: $id }, _set: $input) {
      slug
      title
      type
      role
      salary
      companyName
      description
      location
      locationType
      updated_At
    }
  }
`;

export async function editPost(formData: FormData, jobId?: string) {
  const user = await currentUser();
  if (!user) {
    console.error("No user is logged in.");
    return;
  }

  const values = Object.fromEntries(formData.entries()) as FormDataValues;
  const {
    title,
    role,
    type,
    companyName,
    locationType,
    location,
    description,
    salary,
  } = createJobSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  const updatePostInput = {
    slug,
    title: title.trim(),
    role,
    type,
    companyName: companyName.trim(),
    locationType,
    location,
    description: description?.trim(),
    salary: parseInt(salary, 10),
    updated_At: new Date().toISOString(),
  };

  try {
    await client.mutate({
      mutation: UPDATE_POST_MUTATION,
      variables: { id: jobId, updatePostInput },
    });
  } catch (error) {
    console.error("Failed to update job:", error);
  } finally {
    redirect("/jobs");
  }
}
