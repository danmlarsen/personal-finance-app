"use client";

import { budgetFormSchema } from "@/validation/budgetFormSchema";
import z from "zod";

export default function BudgetsForm({
  onSubmit,
  defaultValues,
  submitButtonText = "Add Budget",
}: {
  onSubmit: (data: z.infer<typeof budgetFormSchema>) => Promise<void>;
  defaultValues?: { category: string; maximum: number | string; theme: string };
  submitButtonText?: string;
}) {
  return <div>form</div>;
}
