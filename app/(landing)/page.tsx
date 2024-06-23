import { Button } from "@/components/ui/button";
import Link from "@/node_modules/next/link";
import React from "react";

export default function page() {
  return (
    <div>
      Landing Page Home Page(unprotected)
      <div>
        <Link href="/sign-in">
          <Button>Log In</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
}
