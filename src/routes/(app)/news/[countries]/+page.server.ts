import { NEWS_API_KEY } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { countries } from '$lib/data/news';
import { error } from '@sveltejs/kit';
import {dummyNews} from '$lib/data/news'

export const load = (async ({ fetch, params }) => {
  const countryCode = countries.find(c => c.code === params.countries)?.code;
  // Make a GET request to the news API, using the value of the country parameter as the value for the country query parameter
  try {
    const data = dummyNews
    //const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${NEWS_API_KEY}`);
   // const data = await response.json();
    
   // Return the original news data as is
    return {
      countryCode,
      news: data.articles,
    };
  } catch (error) {
    console.error(error);
    // If there is an error, return an empty array for the news data
    return { countryCode, news: [] };
  }
}) satisfies PageServerLoad;