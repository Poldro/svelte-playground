import { error } from '@sveltejs/kit';

import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from '$env/static/private'


const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({request}: any) => {
    const data = await request.formData();
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Extract keywords from this text:\n\n${data.get('description')}`,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.8,
      presence_penalty: 0.0,
    });
    console.log(response.data)
     return {success: true, response: response.data}
	}
};

