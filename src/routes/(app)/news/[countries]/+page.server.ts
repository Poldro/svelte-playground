import { NEWS_API_KEY } from '$env/static/private'
import { DEEPL_API_KEY } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { countries } from '$lib/data/news';
import { dummyNews } from '$lib/data/news';
import { error } from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {
  const countryCode = countries.find(c => c.code === params.countries)?.code;
  // Make a GET request to the news API, using the value of the country parameter as the value for the country query parameter
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${NEWS_API_KEY}`);
    const data = await response.json();
    // Translate the title and description of each news item using the DeepL API
    const newsPromises = data.articles.map(async (article: { title: string; description: string; }) => {
      const { title, description } = article;
      const titleResponse = await fetch(`https://api-free.deepl.com/v2/translate?auth_key=${DEEPL_API_KEY}&text=${title}&target_lang=it`);
      const titleTranslation = await titleResponse.json();
      const descriptionResponse = await fetch(`https://api-free.deepl.com/v2/translate?auth_key=${DEEPL_API_KEY}&text=${description}&target_lang=it`);
      const descriptionTranslation = await descriptionResponse.json();
      return {
        ...article,
        title: titleTranslation.translations[0].text,
        description: descriptionTranslation.translations[0].text
      };
    });
    // Wait for all translations to be completed
    const news = await Promise.all(newsPromises);
    return {
      countryCode,
      news,
    };
  } catch (error) {
    console.error(error);
    // If there is an error, return an empty array for the news data
    return { countryCode, news: [] };
  }
}) satisfies PageServerLoad;