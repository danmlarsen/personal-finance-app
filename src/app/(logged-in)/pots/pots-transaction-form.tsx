"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { potsTable } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InferSelectModel } from "drizzle-orm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { depositPot, withdrawPot } from "./actions";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  amount: z.coerce.number().positive(),
});

export default function PotsTransactionForm({
  pot,
  transactionType,
  onSuccess,
}: {
  pot: InferSelectModel<typeof potsTable>;
  transactionType: "deposit" | "withdraw";
  onSuccess: () => void;
}) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    if (transactionType === "deposit") {
      await depositPot(pot.id, data.amount);
      router.refresh();
      onSuccess();
    }

    if (transactionType === "withdraw") {
      await withdrawPot(pot.id, data.amount);
      router.refresh();
      onSuccess();
    }
  }

  const potTotal = Number(pot.total);
  const potTarget = Number(pot.target);

  const amount = Math.abs(Number(form.watch("amount")));
  const newAmount =
    transactionType === "deposit"
      ? potTotal + amount
      : Math.max(potTotal - amount, 0);

  const currentPercent = Math.min((potTotal / potTarget) * 100, 100);
  const amountPercent =
    transactionType === "deposit"
      ? Math.min((amount / potTarget) * 100, 100 - currentPercent)
      : Math.min((amount / potTotal) * 100, potTotal);
  const newPercent = Math.min((newAmount / potTarget) * 100, 100);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p>New Amount</p>
            <p>${newAmount || potTotal}</p>
          </div>

          <div className="bg-beige-100 flex h-2 gap-0.5 overflow-hidden rounded-md">
            <div
              className={cn(
                "flex h-2 justify-end overflow-hidden bg-black",
                transactionType === "withdraw" && "rounded-r-md",
              )}
              style={{ width: `${currentPercent}%` }}
            >
              {transactionType === "withdraw" && (
                <div
                  className="border-l-beige-100 h-2 border-l-2 bg-red-500"
                  style={{ width: `${amountPercent}%` }}
                />
              )}
            </div>
            {transactionType === "deposit" && (
              <div
                className="h-2 rounded-r-md bg-green-500"
                style={{ width: `${amountPercent}%` }}
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <p>{newPercent.toFixed(2)}%</p>
            <p>Target of ${potTarget}</p>
          </div>
        </div>

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount to {transactionType}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  value={field.value as string | number}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Confirm {transactionType}
        </Button>
      </form>
    </Form>
  );
}
