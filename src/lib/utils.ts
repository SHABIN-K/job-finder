import { twMerge } from "tailwind-merge";
import { UserResource } from "@clerk/types";
import { User } from "@clerk/nextjs/server";
import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}

export function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function isAdmin(user: UserResource | User) {
  return user.publicMetadata?.role === "admin";
}
