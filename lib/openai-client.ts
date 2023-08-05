import { Configuration, OpenAIApi } from 'openai-edge';

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY env variable is not set');
  }

  const configuration = new Configuration({ apiKey });

  return new OpenAIApi(configuration);
}

export default getOpenAIClient;
