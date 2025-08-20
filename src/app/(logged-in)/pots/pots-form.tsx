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
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { themeColors } from "@/data/themeColors";
import { potsFormSchema } from "@/validation/potsFormSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { usePotsContext } from "./pots-context";
import { Fragment } from "react";

const NAME_MAXLENGTH = 30;

export default function PotsForm({
  onSubmit,
  defaultValues,
  submitButtonText = "Add Pot",
  submitErrorText,
}: {
  onSubmit: (data: z.infer<typeof potsFormSchema>) => Promise<void>;
  defaultValues?: {
    name: string;
    target: string;
    theme: string;
  };
  submitButtonText?: string;
  submitErrorText?: string;
}) {
  const pots = usePotsContext();
  const alreadyUsedColors = pots.map((p) => p.theme);
  const availableColors = themeColors.filter(
    (c) => !alreadyUsedColors.includes(c.hex),
  );

  const form = useForm({
    resolver: zodResolver(potsFormSchema),
    defaultValues: {
      name: "",
      target: "",
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
          name="name"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Pot Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. Rainy Days"
                  maxLength={NAME_MAXLENGTH}
                />
              </FormControl>
              <div className="relative">
                <FormMessage />
                <div className="text-muted-foreground absolute top-1 right-0 text-end text-xs">
                  {Math.max(NAME_MAXLENGTH - field.value.length, 0)} characters
                  left
                </div>
              </div>
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
                <Input {...field} placeholder="e.g. 2000" type="number" />
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
                  {themeColors.map((theme, idx) => (
                    <Fragment key={theme.name}>
                      <SelectItem
                        value={theme.hex}
                        disabled={
                          alreadyUsedColors.includes(theme.hex) &&
                          theme.hex !== defaultValues?.theme
                        }
                        isUsed={
                          alreadyUsedColors.includes(theme.hex) &&
                          theme.hex !== defaultValues?.theme
                        }
                      >
                        <div
                          className="size-4 rounded-full"
                          style={{ backgroundColor: theme.hex }}
                        />
                        <div>{theme.name}</div>
                      </SelectItem>
                      {idx < themeColors.length - 1 && <SelectSeparator />}
                    </Fragment>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {submitErrorText && <FormMessage>{submitErrorText}</FormMessage>}

        <Button type="submit" size="lg" className="mt-1">
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
}
