import axios from "axios";

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;

// const NEWS_API_ENDPOINT = `https://newsapi.org/v2/everything?q=business AND blockchain&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`;
const NEWS_API_ENDPOINT =
  "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json";

export const getNews = async () => {
  try {
    const response = await axios.get(NEWS_API_ENDPOINT);
    return response.data.articles.slice(0, 30);
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
