"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { themeColors } from "@/data/themeColors";
import { categoriesTable } from "@/db/schema";
import { budgetFormSchema } from "@/validation/budgetFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InferSelectModel } from "drizzle-orm";
import { useForm } from "react-hook-form";
import z from "zod";
import { useBudgetsContext } from "./budgets-context";
import AmountInput from "@/components/ui/amount-input";

export default function BudgetsForm({
  onSubmit,
  categories,
  defaultValues,
  submitButtonText = "Add Budget",
}: {
  onSubmit: (data: z.infer<typeof budgetFormSchema>) => Promise<void>;
  categories: InferSelectModel<typeof categoriesTable>[];
  defaultValues?: { category: number; maximum: string; theme: string };
  submitButtonText?: string;
}) {
  const budgets = useBudgetsContext();
  const alreadyUsedColors = budgets.map((b) => b.theme);
  const alreadyUsedCategories = budgets.map((b) => b.category_id);
  const availableCategories = categories.filter(
    (c) => !alreadyUsedCategories.includes(c.id),
  );
  const availableColors = themeColors.filter(
    (c) => !alreadyUsedColors.includes(c.hex),
  );

  const form = useForm({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      category: availableCategories[0]?.id || 0,
      maximum: "",
      theme: availableColors?.[0].hex || "#277C78",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Category</FormLabel>
              <Select
                value={String(field.value)}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                      disabled={
                        alreadyUsedCategories.includes(category.id) &&
                        category.id !== defaultValues?.category
                      }
                      isUsed={
                        alreadyUsedCategories.includes(category.id) &&
                        category.id !== defaultValues?.category
                      }
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maximum"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Spend</FormLabel>
              <FormControl>
                <AmountInput {...field} placeholder="e.g. 2000" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme</FormLabel>
              <Select
                defaultValue={field.value}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {themeColors.map((theme) => (
                    <SelectItem
                      key={theme.name}
                      value={theme.hex}
                      disabled={
                        alreadyUsedColors.includes(theme.hex) &&
                        theme.hex !== field.value
                      }
                      isUsed={
                        alreadyUsedColors.includes(theme.hex) &&
                        theme.hex !== field.value
                      }
                    >
                      <div
                        className="size-4 rounded-full"
                        style={{ backgroundColor: theme.hex }}
                      />
                      <div>{theme.name}</div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" size="lg">
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
}
