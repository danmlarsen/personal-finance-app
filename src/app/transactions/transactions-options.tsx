"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function TransactionsOptions({
  sortby,
  categories,
  selectedCategory,
}: {
  sortby: string;
  categories: string[];
  selectedCategory: string;
}) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div>
        <Input placeholder="Search transaction" />
      </div>
      <div className="flex gap-2">
        <Select
          defaultValue={sortby}
          onValueChange={(value) =>
            router.push(`/transactions?sortby=${value}`)
          }
        >
          <SelectTrigger>
            <SelectValue />
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

        <Select
          defaultValue="all"
          onValueChange={(value) =>
            router.push(`/transactions?category=${value}`)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category.toLowerCase()}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
