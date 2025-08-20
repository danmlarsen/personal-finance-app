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
import { usePotsContext } from "./pots-context";

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
            <FormItem>
              <FormLabel>Pot Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. Rainy Days"
                  maxLength={NAME_MAXLENGTH}
                />
              </FormControl>
              <div className="text-muted-foreground text-end text-xs">
                {Math.max(NAME_MAXLENGTH - field.value.length, 0)} characters
                left
              </div>
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
                  {themeColors.map((theme) => (
                    <SelectItem
                      key={theme.name}
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
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {submitErrorText && <FormMessage>{submitErrorText}</FormMessage>}

        <Button type="submit" size="lg">
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
}
