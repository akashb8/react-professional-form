import { Newspaper } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { ThemeToggle } from "./theme-toggle";

const TOPICS = [
  { id: "general", label: "Top Stories" },
  { id: "technology", label: "Technology" },
  { id: "sports", label: "Sports" },
  { id: "business", label: "Business" },
  { id: "politics", label: "Politics" },
  { id: "entertainment", label: "Entertainment" },
];

interface HeaderProps {
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
}

export function Header({ selectedTopic, onTopicChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Newspaper className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              NewsDaily
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {TOPICS.map((topic) => (
                <Button
                  key={topic.id}
                  variant={selectedTopic === topic.id ? "default" : "ghost"}
                  className={cn(
                    "rounded-full px-4 font-medium transition-all duration-300",
                    selectedTopic === topic.id 
                      ? "shadow-md scale-105" 
                      : "hover:scale-105"
                  )}
                  onClick={() => onTopicChange(topic.id)}
                >
                  {topic.label}
                </Button>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden overflow-x-auto pb-4 pt-2 no-scrollbar">
          <div className="flex space-x-2">
            {TOPICS.map((topic) => (
              <Button
                key={topic.id}
                variant={selectedTopic === topic.id ? "default" : "outline"}
                size="sm"
                className={cn(
                  "rounded-full whitespace-nowrap",
                  selectedTopic === topic.id && "shadow-sm"
                )}
                onClick={() => onTopicChange(topic.id)}
              >
                {topic.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
