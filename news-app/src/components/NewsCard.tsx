import { ExternalLink, CalendarDays } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import type { Article } from "../lib/api";

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  // Format the date nicely using Intl.DateTimeFormat or date-fns
  const publishDate = new Date(article.publishedAt);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(publishDate);

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card">
      <div className="relative aspect-video overflow-hidden bg-muted">
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=60";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No image available
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {article.source.name && (
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-md font-semibold text-xs shadow-sm">
              {article.source.name}
            </Badge>
          )}
        </div>
      </div>
      
      <CardHeader className="flex-none p-5 pb-3">
        <div className="flex items-center text-xs text-muted-foreground mb-2 gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          <time dateTime={article.publishedAt}>{formattedDate}</time>
        </div>
        <CardTitle className="line-clamp-2 text-lg leading-tight group-hover:text-primary transition-colors">
          {article.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow p-5 pt-0">
        <CardDescription className="line-clamp-3 text-sm text-muted-foreground leading-relaxed">
          {article.description || "No description available for this article."}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 mt-auto">
        <Button 
          asChild 
          className="w-full sm:w-auto font-semibold rounded-full group/btn"
        >
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            Read Article
            <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
