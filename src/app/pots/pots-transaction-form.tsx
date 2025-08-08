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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div>amount: {pot.total}</div>

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

        <Button type="submit">Confirm {transactionType}</Button>
      </form>
    </Form>
  );
}
