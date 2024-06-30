import H1 from "@/components/ui/h1";
import { getJob } from "@/actions/getPosts";
import AddEditForm from "@/components/AddEditForm";


interface PageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: PageProps) {
  const post = await getJob(slug);
  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      <div className="space-y-5 text-center">
        <H1>Update Your Job Listing</H1>
        <p className="text-muted-foreground">
          Make changes to your job post to attract the best talent.
        </p>
      </div>
      <div className="space-y-6 rounded-lg border p-4">
        <div>
          <h2 className="font-semibold">Job details</h2>
          <p className="text-muted-foreground">
            Provide a job description and details
          </p>
        </div>
        <AddEditForm data={post} />
      </div>
    </main>
  );
}
