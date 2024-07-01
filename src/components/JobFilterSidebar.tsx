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

  const { q, type, max_s, min_s } = jobFilterSchema.parse(values);
  const searchParams = new URLSearchParams();
  if (q) searchParams.append("q", q.trim());
  if (type) searchParams.append("type", type);
  if (max_s) searchParams.append("max_s", max_s.toString());
  if (min_s) searchParams.append("min_s", min_s.toString());

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
            <Label htmlFor="min_s">Min Salary</Label>
            <Input
              id="min_s"
              name="min_s"
              placeholder="$5000"
              defaultValue={defaultValues.min_s}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="max_s">Max Salary</Label>
            <Input
              id="max_s"
              name="max_s"
              placeholder="$15000"
              defaultValue={defaultValues.max_s}
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
