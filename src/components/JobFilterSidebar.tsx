import { redirect } from "next/navigation";

import Select from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { jobTypes } from "@/lib/job-types";
import FormSubmitButton from "./FormSubmitButton";
import { JobFilterValues, jobFilterSchema } from "@/lib/validation";

async function filterJobs(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());

  const { q, type, salary } = jobFilterSchema.parse(values);
  const searchParams = new URLSearchParams();
  if (q) searchParams.append("q", q.trim());
  if (type) searchParams.append("type", type);
  if (salary) searchParams.append("salary", salary.toString());

  redirect(`/?${searchParams.toString()}`);
}

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
}

export default async function JobFilterSidebar({
  defaultValues,
}: JobFilterSidebarProps) {
  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              placeholder="Title,Role, company, etc."
              defaultValue={defaultValues.q}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="salary">Salary</Label>
            <Input
              id="salary"
              name="salary"
              placeholder="$5000"
              defaultValue={defaultValues.salary}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValues.type || ""}
            >
              <option value="">All types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <FormSubmitButton className="w-full">Filter jobs</FormSubmitButton>
        </div>
      </form>
    </aside>
  );
}
