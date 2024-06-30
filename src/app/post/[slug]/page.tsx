import JobPage from "@/components/JobPage";
import { getJob } from "@/actions/getPosts";
import { Button } from "@/components/ui/button";

import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: PageProps) {
  const user = await currentUser();
  const job = await getJob(slug);

  if (!job) {
    notFound();
  }

  if (user?.id === job.user_id) {
    console.log(true);
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <aside className="flex w-full flex-row space-x-2">
        <Button asChild>
          <a className="w-40 md:w-fit">Apply now</a>
        </Button>
        {user?.id === job.user_id && (
          <div className="flex w-full justify-end space-x-2">
            <Button asChild className="w-14 md:w-full">
              <a className="w-40 md:w-fit ">
                Edit <span className="ml-1 hidden md:block">Post</span>
              </a>
            </Button>
            <Button asChild className="w-14 md:w-full">
              <a className="w-40 md:w-fit">
                Delete <span className="ml-1 hidden md:block">Post</span>
              </a>
            </Button>
          </div>
        )}
      </aside>
    </main>
  );
}
