import Link from "next/link";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";
import { BadgePlus, LogOut } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";

import logo from "@/assets/logo.ico";
import { Button } from "./ui/button";

export default async function Navbar() {
  const user = await currentUser();

  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} width={40} height={40} alt="Flow Jobs logo" />
          <span className="text-xl font-bold tracking-tight">Horecah Jobs</span>
        </Link>
        <div className="hidden flex-row space-x-1 md:flex">
          <Button asChild>
            <Link href="/jobs/new">Post a job</Link>
          </Button>
          {user && (
            <SignOutButton>
              <Button>log out</Button>
            </SignOutButton>
          )}
        </div>
        <div className="flex flex-row space-x-1 md:hidden">
          <Button className="rounded-full">
            <Link href="/jobs/new">
              <BadgePlus size={20} />
            </Link>
          </Button>
          {user && (
            <SignOutButton>
              <Button className="rounded-full">
                <LogOut size={20} />
              </Button>
            </SignOutButton>
          )}
        </div>
      </nav>
    </header>
  );
}
