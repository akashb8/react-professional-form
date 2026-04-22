import { useQuery } from "@tanstack/react-query";
import { fetchTopHeadlines } from "../lib/api";
import { NewsCard } from "./NewsCard";
import { Skeleton } from "./ui/skeleton";
import { AlertCircle } from "lucide-react";

interface NewsFeedProps {
  topic: string;
}

export function NewsFeed({ topic }: NewsFeedProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["news", topic],
    queryFn: () => fetchTopHeadlines(topic),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-4 rounded-xl border bg-card p-4 shadow-sm">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-[100px] w-full" />
            <Skeleton className="h-10 w-[120px] rounded-full mt-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl bg-destructive/10 text-destructive border-destructive/20 mt-10 shadow-sm">
        <AlertCircle className="h-12 w-12 mb-4 opacity-80" />
        <h3 className="text-xl font-bold mb-2">Failed to load news</h3>
        <p className="text-destructive/80 max-w-md">
          {error instanceof Error ? error.message : "An unexpected error occurred while fetching the news."}
        </p>
      </div>
    );
  }

  if (!data?.articles || data.articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center border rounded-xl bg-muted/30 mt-10">
        <div className="text-6xl mb-4">📰</div>
        <h3 className="text-2xl font-bold mb-2">No news found</h3>
        <p className="text-muted-foreground">
          We couldn't find any articles for "{topic}". Try selecting a different topic.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {data.articles.map((article, index) => (
        <NewsCard key={`${article.url}-${index}`} article={article} />
      ))}
    </div>
  );
}
