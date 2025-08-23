"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import IconSearch from "@/assets/images/icon-search.svg";
import IconSortMobile from "@/assets/images/icon-sort-mobile.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMediaQuery } from "@/hooks/use-media-query";

const formSchema = z.object({
  billTitle: z.string().optional(),
  sortby: z.string().optional(),
});

export default function RecurringBillsOptions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      billTitle: searchParams.get("title") ?? "",
      sortby: searchParams.get("sortby") ?? "latest",
    },
  });

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    const newSearchParams = new URLSearchParams();

    if (data.billTitle) {
      newSearchParams.set("title", data.billTitle);
    }

    if (data.sortby) {
      newSearchParams.set("sortby", data.sortby);
    }

    router.push(`/recurring-bills?${newSearchParams.toString()}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex items-center justify-between gap-2"
      >
        <FormField
          control={form.control}
          name="billTitle"
          render={({ field }) => (
            <FormItem className="w-full max-w-xs">
              <FormControl>
                <div className="relative">
                  <Input {...field} placeholder="Search transaction" />
                  <Image
                    src={IconSearch}
                    alt="Search icon"
                    className="absolute top-1/2 right-5 -translate-y-1/2"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sortby"
          render={({ field }) => (
            <FormItem className="flex gap-2">
              <FormLabel className="hidden shrink-0 md:flex">Sort by</FormLabel>
              <Select
                defaultValue={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  form.handleSubmit(handleSubmit)();
                }}
              >
                <SelectTrigger isIcon={isMobile} className="px-2 md:px-5">
                  {!isMobile && <SelectValue />}
                  {isMobile && (
                    <Image
                      src={IconSortMobile}
                      alt="Sort icon"
                      width={20}
                      height={20}
                      className="size-5"
                    />
                  )}
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="a-z">A to Z</SelectItem>
                  <SelectItem value="z-a">Z to A</SelectItem>
                  <SelectItem value="highest">Highest</SelectItem>
                  <SelectItem value="lowest">Lowest</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
