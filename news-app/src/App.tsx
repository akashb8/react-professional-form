import { useState } from "react";
import { Header } from "./components/Header";
import { NewsFeed } from "./components/NewsFeed";

function App() {
  const [topic, setTopic] = useState("general");

  return (
    <div className="min-h-screen bg-background font-sans antialiased selection:bg-primary/20">
      <Header selectedTopic={topic} onTopicChange={setTopic} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8 max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">
            {topic === "general" 
              ? "Top Headlines" 
              : `${topic.charAt(0).toUpperCase() + topic.slice(1)} News`}
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay informed with the latest updates and breaking stories from trusted sources worldwide.
          </p>
        </div>
        
        <NewsFeed topic={topic} />
      </main>

      <footer className="border-t py-12 mt-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Akash Bhattacharyya. All rights reserved.</p>
          <p className="text-sm mt-2">
            Powered by <a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline underline-offset-4">NewsAPI.org</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
