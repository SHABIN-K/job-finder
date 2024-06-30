"use server";

import { nanoid } from "nanoid";
import { gql } from "@apollo/client";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import client from "@/config/api";
import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import { FormDataValues } from "@/types";

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST($object: post_insert_input!) {
    insert_post_one(object: $object) {
      user_id
      slug
      title
      type
      role
      salary
      companyName
      description
      location
      locationType
      created_At
      updated_At
    }
  }
`;

export async function createJobPosting(formData: FormData) {
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

  const jobPostingInput = {
    user_id: user.id,
    slug,
    title: title.trim(),
    role,
    type,
    companyName: companyName.trim(),
    locationType,
    location,
    description: description?.trim(),
    salary: parseInt(salary, 10),
    created_At: new Date().toISOString(),
    updated_At: new Date().toISOString(),
  };

  try {
    await client.mutate({
      mutation: CREATE_POST_MUTATION,
      variables: { object: jobPostingInput },
    });
  } catch (error) {
    console.error("Failed to create job posting:", error);
  } finally {
    redirect("/jobs");
  }
}
