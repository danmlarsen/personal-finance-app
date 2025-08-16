"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Image from "next/image";
import IconSortMobile from "@/assets/images/icon-sort-mobile.svg";
import IconFilterMobile from "@/assets/images/icon-filter-mobile.svg";
import { useMediaQuery } from "@/hooks/use-media-query";

const formSchema = z.object({
  transactionName: z.string().optional(),
  sortby: z.string().optional(),
  category: z.string().optional(),
});

export default function TransactionsOptions({
  categories,
}: {
  categories: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isMobile = useMediaQuery("(max-width: 600px)");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionName: searchParams.get("name") ?? "",
      sortby: searchParams.get("sortby") ?? "latest",
      category: searchParams.get("category") ?? "all",
    },
  });

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    const newSearchParams = new URLSearchParams();

    if (data.transactionName) {
      newSearchParams.set("name", data.transactionName);
    }

    if (data.sortby) {
      newSearchParams.set("sortby", data.sortby);
    }

    if (data.category) {
      newSearchParams.set("category", data.category);
    }

    newSearchParams.set("page", "1");
    router.push(`/transactions?${newSearchParams.toString()}`);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex items-center justify-between"
        >
          <FormField
            control={form.control}
            name="transactionName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Search transaction" />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex md:gap-8">
            <FormField
              control={form.control}
              name="sortby"
              render={({ field }) => (
                <FormItem className="flex gap-2">
                  <FormLabel className="hidden md:flex">Sort by</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.handleSubmit(handleSubmit)();
                    }}
                  >
                    <SelectTrigger isIcon={isMobile}>
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

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex gap-2">
                  <FormLabel className="hidden md:flex">Category</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.handleSubmit(handleSubmit)();
                    }}
                  >
                    <SelectTrigger isIcon={isMobile}>
                      {!isMobile && <SelectValue />}
                      {isMobile && (
                        <Image
                          src={IconFilterMobile}
                          alt="Filter icon"
                          width={20}
                          height={20}
                          className="size-5"
                        />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Transactions</SelectItem>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category.toLowerCase()}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  );
}
