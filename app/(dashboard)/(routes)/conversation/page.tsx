"use client";
import * as z from "zod";
import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";

export default function ConversationPage() {
  const form = useForm({
    defaultValues: {
      prompt: "",
    },
  });
  return (
    <div>
      <Heading
        title="Convesation"
        description="Our Most Advanced Conversation Model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8"></div>
    </div>
  );
}
