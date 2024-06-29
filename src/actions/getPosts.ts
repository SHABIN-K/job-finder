import client from "@/config/api";
import { JobFilterValues } from "@/lib/validation";
import { gql } from "@apollo/client";

const GET_JOBS_QUERY = gql`
  query GetJobs($where: post_bool_exp!) {
    post(where: $where, order_by: { created_At: desc }) {
      id
      user_id
      slug
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
  }
`;
export default async function getJobPosts({
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
