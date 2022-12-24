import { Configuration, OpenAIApi } from "openai";
import { NEWS_API_KEY } from '$env/static/private'

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(NEWS_API_KEY);


export const load = (async ({params}) => {
  // To query /v2/top-headlines
  // All options passed to topHeadlines are optional, but you need to include at least one of them
  newsapi.v2.topHeadlines({
    language: 'it',
    country: 'it'
  }).then((response: any) => {
    console.log(response);
    /*
      {
        status: "ok",
        articles: [...]
      }
    */
  });
});

