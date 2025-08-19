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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { themeColors } from "@/data/themeColors";
import { potsFormSchema } from "@/validation/potsFormSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

export default function PotsForm({
  onSubmit,
  defaultValues,
  submitButtonText = "Add Pot",
}: {
  onSubmit: (data: z.infer<typeof potsFormSchema>) => Promise<void>;
  defaultValues?: {
    name: string;
    target: string | number;
    theme: string;
  };
  submitButtonText?: string;
}) {
  const form = useForm({
    resolver: zodResolver(potsFormSchema),
    defaultValues: {
      name: "",
      target: "",
      theme: "#277C78",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pot Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Rainy Days" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="target"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. 2000"
                  type="number"
                  value={field.value as number | string}
                />
              </FormControl>
              <FormMessage />
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
                    <SelectItem key={theme.name} value={theme.hex}>
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

        <Button type="submit" size="lg">
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
}
