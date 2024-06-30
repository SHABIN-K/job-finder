import JobResults from "@/components/JobResults";

import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="text-center">
        <h1 className="text-xl font-extrabold">Manage Your Jobs</h1>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobResults user_Id={user?.id} />
      </section>
    </main>
  );
}
