import { JobFilterValues } from "@/lib/validation";

import Link from "next/link";
import JobListItem from "./JobListItem";

interface JobResultsProps {
  filterValues: JobFilterValues;
}

export default async function JobResults({ filterValues }: JobResultsProps) {
  const jobs = [
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

  return (
    <div className="grow space-y-4">
      {jobs.map((job: any, index) => (
        <Link key={index} href={`/jobs/${job.slug}`} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="text- Fcenter m-auto">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
    </div>
  );
}
