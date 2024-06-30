import client from "@/config/api";

import { gql } from "@apollo/client";

const DELETE_JOB_MUTATION = gql`
  mutation DELETE_POST($id: Int!) {
    delete_post(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export async function deletePost(id: number) {
  try {
    const { data } = await client.mutate({
      mutation: DELETE_JOB_MUTATION,
      variables: { id },
    });

    if (data.delete_post.affected_rows > 0) {
      console.log("Job deleted successfully");
    } else {
      console.error("Failed to delete the job");
    }
  } catch (error) {
    console.error("Failed to delete job :", error);
  }
}
