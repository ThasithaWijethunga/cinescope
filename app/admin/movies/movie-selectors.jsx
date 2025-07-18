"use client";

import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDeferredValue, useEffect, useState, useRef } from "react";

export default function MovieSelectors() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchTerm = searchParams.get("query") || "";

  const [statusFilter, setStatusFilter] = useState("all");
  const [immediateSearchTerm, setImmediateSearchTerm] = useState(searchTerm);

  const deferredSearchTerm = useDeferredValue(immediateSearchTerm);
  const isFirstRender = useRef(true);

  const handleMovieSearch = (term) => {
    // // console.log(term);
    // const params = new URLSearchParams(searchParams);

    // if (term) {
    //   params.set("query", term);
    // } else {
    //   params.delete("query");
    // }

    // // console.log("search term : ", term, params.get("query"), pathname);

    // replace(`${pathname}?${params.toString()}`);

    setImmediateSearchTerm(term);
  };

  useEffect(() => {
     if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const params = new URLSearchParams(searchParams);

    deferredSearchTerm
      ? params.set("query", deferredSearchTerm)
      : params.delete("query");

    replace(`${pathname}?${params.toString()}`);
  });

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex w-full items-center space-x-2 ">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search movies..."
          onChange={(e) => handleMovieSearch(e.target.value)}
          className="h-9"
          defaultValue={searchTerm}
        />
      </div>

      <div className="flex flex-center gap-2">
        {/* Controlled select input */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className=" h-9 w-[180px]">
            <SelectValue placeholder="Filter By status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" className="h-9">
          <SlidersHorizontal className=" mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>
    </div>
  );
}
