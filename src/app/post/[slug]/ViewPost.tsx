"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { PostProps } from "@/types";
import JobPage from "@/components/JobPage";
import AlertBox from "@/components/AlertBox";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/actions/deletePost";

interface ViewPostProps {
  userId?: string;
  job: PostProps;
}

const ViewPost: React.FC<ViewPostProps> = ({ userId = "", job }) => {
  const router = useRouter();
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);

  const handleDelete = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (job.user_id === userId && job.id) {
      try {
        await deletePost(parseInt(job.id));
        router.push("/jobs");
      } catch (error) {
        console.error("Error deleting job:", error);
      } finally {
        setAlertOpen(false);
      }
    } else {
      console.error("Job ID is undefined or user is not authorized");
    }
  };

  return (
    <>
      {isAlertOpen && (
        <AlertBox
          open={isAlertOpen}
          onOpenChange={setAlertOpen}
          onConfirm={handleDelete}
          onCancel={() => setAlertOpen(false)}
          desc="This will permanently delete your Post."
        />
      )}
      <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
        <JobPage job={job} />
        <aside
          className={`flex ${
            userId && job.user_id === userId ? "w-full" : ""
          } flex-row space-x-2`}
        >
          <Button asChild>
            <a className="w-40 md:w-fit">Apply now</a>
          </Button>
          {userId === job.user_id && (
            <div className="flex w-full justify-end space-x-2">
              <Button asChild className="w-14 md:w-full">
                <a className="w-40 md:w-fit ">
                  Edit <span className="ml-1 hidden md:block">Post</span>
                </a>
              </Button>
              <Button
                asChild
                className="w-14 md:w-full"
                onClick={() => setAlertOpen(true)}
              >
                <a className="w-40 md:w-fit">
                  Delete <span className="ml-1 hidden md:block">Post</span>
                </a>
              </Button>
            </div>
          )}
        </aside>
      </main>
    </>
  );
};

export default ViewPost;
