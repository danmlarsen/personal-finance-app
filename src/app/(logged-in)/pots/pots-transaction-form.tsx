"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { potsTable } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InferSelectModel } from "drizzle-orm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { depositPot, withdrawPot } from "./actions";
import { useRouter } from "next/navigation";
import AmountInput from "@/components/ui/amount-input";
import PotsNewAmountDisplay from "./pots-new-amount-display";

const formSchema = z.object({
  amount: z.coerce
    .number<string | number>()
    .positive("Please enter a positive number")
    .max(10000, "Maximum transaction amount is $10,000"),
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
    const response =
      transactionType === "deposit"
        ? await depositPot(pot.id, data.amount)
        : await withdrawPot(pot.id, data.amount);

    if (response.error) {
      form.setError("root", {
        message: response.message,
      });
    }

    if (response.success) {
      router.refresh();
      onSuccess();
    }
  }

  const amount = Math.abs(Number(form.watch("amount")));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <PotsNewAmountDisplay
          pot={pot}
          amount={amount}
          transactionType={transactionType}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Amount to {transactionType === "deposit" ? "Add" : "Withdraw"}
              </FormLabel>
              <FormControl>
                <AmountInput {...field} placeholder="e.g. 2000" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!!form.formState.errors.root?.message && (
          <FormMessage>{form.formState.errors.root.message}</FormMessage>
        )}

        <Button type="submit" className="mt-2 w-full" size="lg">
          Confirm {transactionType === "deposit" ? "Addition" : "Withdrawal"}
        </Button>
      </form>
    </Form>
  );
}
