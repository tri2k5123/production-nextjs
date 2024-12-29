import TrendsSidebar from "@/components/TrendsSidebar";
import { Metadata } from "next";
import SearchResults from "./SearchResults";

export function generateMetadata({searchParams: { q }}: SearchPageProps): Metadata{
    return {
        title: `Search results for "${q}"`,
    };
}
interface SearchPageProps {
  searchParams: { q: string };
}

export default function SearchPage({ searchParams: { q } }: SearchPageProps) {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="text-center text-2xl font-bold line-clamp-2 break-all">
            Search results for &quot;{q}&quot;
          </h1>
        </div>
        <SearchResults query={q} />
      </div>
      <TrendsSidebar />
    </main>
  );
}
