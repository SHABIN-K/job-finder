import ViewPost from "./ViewPost";
import { getJob } from "@/actions/getPosts";

import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: PageProps) {
  const user = await currentUser();
  const job = await getJob(slug);

  if (job.length === 0) {
    notFound();
  }

  return <ViewPost userId={user?.id} job={job} />;
}
