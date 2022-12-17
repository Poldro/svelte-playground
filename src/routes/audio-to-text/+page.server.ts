import { error } from '@sveltejs/kit';

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
console.log(openai)

export const actions = {
	default: async (request: string) => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Extract keywords from this text:\n\n${request}`,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.8,
      presence_penalty: 0.0,
    });
    return response
	}
};


 
/** @type {import('./$types').PageServerLoad} */
export async function load() {


}