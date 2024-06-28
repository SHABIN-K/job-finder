import JobPage from "@/components/JobPage";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: { slug: string };
}
/* 

const getJob = cache(async (slug: string) => {
  const job = await db.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  return job;
});
 */

export default async function Page({ params: { slug } }: PageProps) {
  //const job = await getJob(slug);
  const job = [
    {
      id: "dasfafasdfdsfsadfsadfasf",
      slug: "full-stack-developer",
      title: "full stack developer",
      type: "/log.dng",
      locationType: "/log.dng",
      location: "/log.dng",
      description: "/log.dng",
      salary: "/log.dng",
      companyName: "/log.dng",
      applicationEmail: "/log.dng",
      applicationUrl: "/log.dng",
      companyLogoUrl: "/log.dng",
      approved: true,
      createdAt: "2023-12-19T13:37:35.608+00:00",
      updatedAt: "2023-12-19T13:37:35.608+00:00",
    },
  ];

  const { applicationEmail, applicationUrl } = job[0];

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.error("Job has no application link or email");
    notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <aside>
        <Button asChild>
          <a href={applicationLink} className="w-40 md:w-fit">
            Apply now
          </a>
        </Button>
      </aside>
    </main>
  );
}
