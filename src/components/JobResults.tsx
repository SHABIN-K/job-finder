"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { PostProps } from "@/types";
import JobListItem from "./JobListItem";

interface JobResultsProps {
  data: PostProps;
}

export default function JobResults({ data }: JobResultsProps) {
  const [jobs, setJobs] = useState<PostProps>();
  useEffect(() => {
    setJobs(data);
  }, [data, jobs]);

  if (!Array.isArray(jobs)) {
    return (
      <p className="m-auto text-center">
        <span className="flex items-center justify-center gap-1">
          <Loader2 size={16} className="animate-spin" />
        </span>
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
