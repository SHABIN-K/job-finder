"use client";

import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { draftToMarkdown } from "markdown-draft-js";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PostProps } from "@/types";
import Select from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/LoadingButton";
import LocationInput from "@/components/LocationInput";
import { createJobPosting } from "@/actions/createPost";
import RichTextEditor from "@/components/RichTextEditor";
import { jobTypes, locationTypes } from "@/lib/job-types";
import { CreateJobValues, createJobSchema } from "@/lib/validation";

interface AddEditPostProps {
  data?: PostProps;
}

const AddEditForm: React.FC<AddEditPostProps> = ({ data }) => {
  const defaultValues = {
    title: data?.title || "",
    role: data?.role || "",
    type: data?.type || "",
    companyName: data?.companyName || "",
    locationType: data?.locationType || "",
    location: data?.location || "",
    description: data?.description || "",
    salary: data?.salary?.toString() || "",
  };

  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CreateJobValues) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await createJobPosting(formData);
      alert("Job posting created/updated successfully!");
    } catch (error) {
      alert("Something went wrong, please try again.");
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Frontend Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job role</FormLabel>
              <FormControl>
                <Input placeholder="e.g. product engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job type</FormLabel>
              <FormControl>
                <Select {...field} defaultValue={data?.type || ""}>
                  <option value="" hidden>
                    Select an option
                  </option>
                  {jobTypes.map((jobType) => (
                    <option key={jobType} value={jobType}>
                      {jobType}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  defaultValue={data?.locationType || ""}
                  onChange={(e) => {
                    field.onChange(e);
                    if (e.currentTarget.value === "Remote") {
                      trigger("location");
                    }
                  }}
                >
                  <option value="" hidden>
                    Select an option
                  </option>
                  {locationTypes.map((locationType) => (
                    <option key={locationType} value={locationType}>
                      {locationType}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Office location</FormLabel>
              <FormControl>
                <LocationInput
                  onLocationSelected={field.onChange}
                  ref={field.ref}
                />
              </FormControl>
              {watch("location") && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setValue("location", "", { shouldValidate: true });
                    }}
                  >
                    <X size={20} />
                  </button>
                  <span className="text-sm">{watch("location")}</span>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Label onClick={() => setFocus("description")}>Description</Label>
              <FormControl>
                <RichTextEditor
                  onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                  ref={field.ref}
                  initialValue={data?.description || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" loading={isSubmitting}>
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
};

export default AddEditForm;
