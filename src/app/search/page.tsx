import type { Metadata } from "next";
import {
  SearchExperience,
  type SearchInitialState,
} from "@/components/search/SearchExperience";
import type { SearchKind } from "@/lib/search-index";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search artifacts, missions, destinations, deep-sky records, lessons, journeys, articles, agencies and glossary terms across GRAVERSE.",
};

type SearchParams = Record<string, string | string[] | undefined>;

const kinds: Array<SearchKind | "all"> = [
  "all",
  "artifact",
  "mission",
  "body",
  "deep-sky",
  "lesson",
  "journey",
  "article",
  "agency",
  "glossary",
];

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const kindParam = first(searchParams.kind);
  const kind = kinds.includes(kindParam as SearchKind | "all")
    ? (kindParam as SearchKind | "all")
    : "all";

  const initial: SearchInitialState = {
    query: first(searchParams.q) ?? "",
    kind,
  };

  return (
    <div className="container-content pb-16 pt-8 sm:pt-10">
      <SearchExperience initial={initial} />
    </div>
  );
}
