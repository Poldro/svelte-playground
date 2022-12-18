import { error } from '@sveltejs/kit';

import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from '$env/static/private'

export const prerender = true;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


/** @type {import('./$types').Actions} */
export const actions = {
	openai_api: async ({request}: any) => {
    const data = await request.formData();
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Extract keywords from this text:\n\n${data.get('text-to-formulate-keywords-on')}`,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.8,
      presence_penalty: 0.0,
    });
     return {success: true, question: data.get('text-to-formulate-keywords-on'), answer: response.data}
	}
};

