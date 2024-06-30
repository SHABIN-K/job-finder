import client from "@/config/api";
import { JobFilterValues } from "@/lib/validation";

import { cache } from "react";
import { gql } from "@apollo/client";

const JOB_FIELDS = gql`
  fragment JobFields on post {
    id
    user_id
    slug
    role
    title
    type
    locationType
    location
    description
    salary
    companyName
    created_At
    updated_At
  }
`;

export const GET_JOBS_QUERY = gql`
  query Get_posts($where: post_bool_exp!) {
    post(where: $where, order_by: { created_At: desc }) {
      ...JobFields
    }
  }
  ${JOB_FIELDS}
`;

export const GET_JOB_QUERY = gql`
  query Get_post($slug: String!) {
    post(where: { slug: { _eq: $slug } }) {
      ...JobFields
    }
  }
  ${JOB_FIELDS}
`;

export const GET_USER_JOBS_QUERY = gql`
  query Get_post($user_Id: String!) {
    post(
      where: { user_id: { _eq: $user_Id } }
      order_by: { created_At: desc }
    ) {
      ...JobFields
    }
  }
  ${JOB_FIELDS}
`;

export const getUserPosts = cache(async ({ user_Id }: { user_Id: string }) => {
  try {
    const { data } = await client.query({
      query: GET_USER_JOBS_QUERY,
      variables: { user_Id },
    });

    return data.post || [];
  } catch (error) {
    console.error("Error fetching job post:", error);
    return [];
  }
});

export const getJob = cache(async (slug: string) => {
  try {
    const { data } = await client.query({
      query: GET_JOB_QUERY,
      variables: { slug },
    });

    return data.post[0] || [];
  } catch (error) {
    console.error("Error fetching job post:", error);
    return [];
  }
});

export async function getJobPosts({
  filterValues,
}: {
  filterValues: JobFilterValues;
}) {
  const { q, type, salary } = filterValues;

  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter = searchString
    ? {
        _or: [
          { title: { _ilike: `%${searchString}%` } },
          { companyName: { _ilike: `%${searchString}%` } },
          { type: { _ilike: `%${searchString}%` } },
          { role: { _ilike: `%${searchString}%` } },
        ],
      }
    : {};

  const where = {
    _and: [
      searchFilter,
      type ? { type: { _eq: type } } : {},
      salary ? { salary: { _lte: parseInt(salary) } } : {},
    ],
  };

  try {
    const { data } = await client.query({
      query: GET_JOBS_QUERY,
      variables: {
        where,
      },
    });

    return data.post || [];
  } catch (error) {
    console.error("Error fetching job posts:", error);
    return [];
  }
}
