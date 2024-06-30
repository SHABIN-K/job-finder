import JobPage from "@/components/JobPage";
import { getJob } from "@/actions/getPosts";
import { Button } from "@/components/ui/button";

import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await getJob(slug);

  if (!job) {
    notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <aside>
        <Button asChild>
          <a className="w-40 md:w-fit">Apply now</a>
        </Button>
      </aside>
    </main>
  );
}
