import Link from "next/link";

import JobListItem from "./JobListItem";
import { JobFilterValues } from "@/lib/validation";
import { getJobPosts, getUserPosts } from "@/actions/getPosts";

interface JobResultsProps {
  filterValues?: JobFilterValues;
  user_Id?: string;
}

export default async function JobResults({
  filterValues = {},
  user_Id,
}: JobResultsProps) {
  let jobs: any[] = [];

  if (user_Id) {
    jobs = await getUserPosts({ user_Id });
  } else {
    jobs = await getJobPosts({ filterValues });
  }

  if (!Array.isArray(jobs)) {
    console.error("Unexpected response format for jobs:", jobs);
    return (
      <p className="m-auto text-center">
        Error loading jobs. Please try again later.
      </p>
    );
  }

  return (
    <div
      className={` ${
        user_Id && jobs.length > 0 ? "grid grid-cols-2 gap-3" : "grow space-y-4"
      }`}
    >
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
