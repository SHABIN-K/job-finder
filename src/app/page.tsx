import H1 from "@/components/ui/h1";
import JobResults from "@/components/JobResults";
import { getAllPosts } from "@/actions/getPosts";
import { JobFilterValues } from "@/lib/validation";
import JobFilterSidebar from "@/components/JobFilterSidebar";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    max_s?: string;
    min_s?: string;
  };
}
export default async function Home({
  searchParams: { q, type, max_s, min_s },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    max_s,
    min_s,
  };

  const posts = await getAllPosts({ filterValues });

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>Land Your Perfect Job Today!</H1>
        <p className="text-muted-foreground">
          Search millions of job openings and filter them by your skills and
          interests.
        </p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults data={posts} />
      </section>
    </main>
  );
}
