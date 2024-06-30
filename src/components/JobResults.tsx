import Link from "next/link";

import JobListItem from "./JobListItem";
import { getJobPosts } from "@/actions/getPosts";
import { JobFilterValues } from "@/lib/validation";

interface JobResultsProps {
  filterValues: JobFilterValues;
}

export default async function JobResults({ filterValues }: JobResultsProps) {
  const jobs = await getJobPosts({ filterValues });

  if (!Array.isArray(jobs)) {
    console.error("Unexpected response format for jobs:", jobs);
    return (
      <p className="m-auto text-center">
        Error loading jobs. Please try again later.
      </p>
    );
  }

  return (
    <div className="grow space-y-4">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <Link key={job.id} href={`/post/${job.slug}`} className="block">
            <JobListItem job={job} />
          </Link>
        ))
      ) : (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
    </div>
  );
}
