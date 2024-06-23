import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function DashboardPage() {
  return (
    <div>
      <p>dashboard page (protected)</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
