import client from "@/config/api";
import { JobFilterValues } from "@/lib/validation";

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
  query GET_POSTS($where: post_bool_exp!) {
    post(where: $where, order_by: { created_At: desc }) {
      ...JobFields
    }
  }
  ${JOB_FIELDS}
`;

export const GET_JOB_QUERY = gql`
  query GET_POST($slug: String!) {
    post(where: { slug: { _eq: $slug } }) {
      ...JobFields
    }
  }
  ${JOB_FIELDS}
`;

export const GET_USER_JOBS_QUERY = gql`
  query GET_USER_POSTS($user_Id: String!) {
    post(
      where: { user_id: { _eq: $user_Id } }
      order_by: { created_At: desc }
    ) {
      ...JobFields
    }
  }
  ${JOB_FIELDS}
`;

export const getUserPosts = async ({ user_Id }: { user_Id: string }) => {
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
};

export const getJob = async (slug: string) => {
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
};

export async function getJobPosts({
  filterValues,
}: {
  filterValues: JobFilterValues;
}) {
  const { q, type, salary } = filterValues;

  const searchWords = q?.split(" ").filter((word) => word.length > 0);

  const searchFilter = q
    ? {
        _or: [
          { title: { _ilike: `%${q}%` } },
          { companyName: { _ilike: `%${q}%` } },
          { type: { _ilike: `%${q}%` } },
          { role: { _ilike: `%${q}%` } },
        ],
      }
    : {};

  const where = {
    _and: [
      searchFilter,
      type ? { type: { _eq: type } } : { type: { _is_null: false } },
      salary
        ? { salary: { _lte: parseInt(salary) } }
        : { salary: { _is_null: false } },
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
