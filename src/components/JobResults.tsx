import { JobFilterValues } from "@/lib/validation";

import Link from "next/link";
import JobListItem from "./JobListItem";

interface JobResultsProps {
  filterValues: JobFilterValues;
}

export default async function JobResults({ filterValues }: JobResultsProps) {
  const jobs = [null];

  return (
    <div className="grow space-y-4">
      {jobs.map((job: any) => (
        <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
    </div>
  );
}
