"use client";

import Link from "next/link";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { BadgePlus, LayoutDashboard, LogOut } from "lucide-react";

import logo from "@/assets/logo.ico";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} width={40} height={40} alt="Flow Jobs logo" />
          <span className="text-xl font-bold tracking-tight">Horecah Jobs</span>
        </Link>
        <div className="hidden flex-row space-x-1 md:flex">
          {pathname === "/" ? (
            <Button asChild>
              <Link href="/jobs">Manage</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/jobs/new">Add job</Link>
            </Button>
          )}
          {user && (
            <Button>
              <div
                onClick={async () => {
                  await signOut();
                  router.push("/");
                }}
              >
                log out
              </div>
            </Button>
          )}
        </div>
        <div className="flex flex-row space-x-1 md:hidden">
          {pathname === "/" ? (
            <Button className="rounded-full">
              <Link href="/jobs">
                <LayoutDashboard size={20} />
              </Link>
            </Button>
          ) : (
            <Button className="rounded-full">
              <Link href="/jobs/new">
                <BadgePlus size={20} />
              </Link>
            </Button>
          )}
          {user && (
            <Button className="rounded-full">
              <div
                onClick={async () => {
                  await signOut();
                  router.push("/");
                }}
              >
                <LogOut size={20} />
              </div>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
