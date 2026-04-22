import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export const newsApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-Api-Key": API_KEY,
  },
});

export interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export const fetchTopHeadlines = async (
  category: string = "general",
  page: number = 1
): Promise<NewsResponse> => {
  // Use 'us' as default country for top headlines, or you could pass language='en'
  const response = await newsApi.get<NewsResponse>("/top-headlines", {
    params: {
      category: category !== "all" ? category : "general",
      language: "en",
      page,
      pageSize: 12,
    },
  });
  
  // Filter out articles that have "[Removed]" as title or no urlToImage to keep the UI clean
  const cleanArticles = response.data.articles.filter(
    (article) => article.title !== "[Removed]" && article.urlToImage
  );

  return { ...response.data, articles: cleanArticles };
};
