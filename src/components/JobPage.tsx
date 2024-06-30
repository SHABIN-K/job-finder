import Markdown from "./Markdown";
import { PostProps } from "@/types";
import { formatMoney } from "@/lib/utils";

import Link from "next/link";
import Image from "next/image";
import companyLogo from "@/assets/company-logo-placeholder.png";
import { Banknote, Briefcase, Globe2, MapPin, ScrollText } from "lucide-react";

interface JobPageProps {
  job: PostProps;
}

export default function JobPage({
  job: {
    title,
    description,
    companyName,
    type,
    role,
    locationType,
    location,
    salary,
  },
}: JobPageProps) {
  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-3">
        <Image
          src={companyLogo}
          alt="Company logo"
          width={100}
          height={100}
          className="rounded-xl"
        />
        <div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="font-semibold">
              <Link
                href={`https://www.google.com/search?q=${companyName}`}
                className="text-green-500 hover:underline"
              >
                {companyName}
              </Link>
            </p>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <ScrollText size={16} className="shrink-0" />
              {role}
            </p>
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shrink-0" />
              {type}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              {locationType}
            </p>
            <p className="flex items-center gap-1.5">
              <Globe2 size={16} className="shrink-0" />
              {location || "Worldwide"}
            </p>
            <p className="flex items-center gap-1.5">
              <Banknote size={16} className="shrink-0" />
              {formatMoney(parseInt(salary))}
            </p>
          </div>
        </div>
      </div>
      <div>{description && <Markdown>{description}</Markdown>}</div>
    </section>
  );
}
