"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { DumbbellIcon, HomeIcon, UserIcon, ZapIcon } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="px-1 fixed left-0 top-0 z-100 bg-black/40 backdrop-blur-md border-b border-orange-600/30 py-3 w-full">
      <div className="container mx-auto md:flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-md bg-orange-600/10 border border-orange-600/20 group-hover:bg-orange-600/20 transition-colors">
            <ZapIcon className="text-orange-500" size={18} />
          </div>
          <span className="text-xl font-bold font-mono tracking-tight">
            Fit<span className="text-orange-500">Trainer</span>
            <span className="text-orange-600/60">.ai</span>
          </span>
        </Link>

        {/* Nav */}
        <div className="flex items-center gap-6">
          {isSignedIn ? (
            <>
              <Link
                href="/"
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200"
              >
                <HomeIcon size={15} />
                <span>Home</span>
              </Link>
              <Link
                href="/generate-program"
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200"
              >
                <DumbbellIcon size={15} />
                <span>Generate</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200"
              >
                <UserIcon size={15} />
                <span>Profile</span>
              </Link>

              <Button
                variant="outline"
                className="ml-1 border-orange-600/40 text-orange-400 bg-transparent hover:bg-orange-600/15 hover:border-orange-500 hover:text-orange-300 transition-all duration-200"
              >
                Get Started
              </Button>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-orange-400 hover:bg-orange-600/10 transition-all duration-200"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-orange-600 hover:bg-orange-500 text-white border-0 transition-all duration-200">
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
