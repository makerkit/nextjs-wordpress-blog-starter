import type { CreateChatCompletionResponse } from 'openai-edge';
import getOpenAIClient from './openai-client';

interface GeneratePostParams {
  title: string;
  maxTokens?: number;
  temperature?: number;
}

const MODEL = `gpt-3.5-turbo`;

export async function generatePostContent(params: GeneratePostParams) {
  const { title, maxTokens, temperature } = params;
  const client = getOpenAIClient();
  const content = getCreatePostPrompt(title);

  const response = await client.createChatCompletion({
    model: MODEL,
    temperature: temperature ?? 0.7,
    max_tokens: maxTokens ?? 200,
    messages: [
      {
        role: 'user',
        content,
      },
    ],
  });

  const json = (await response.json()) as CreateChatCompletionResponse;
  const usage = json.usage?.total_tokens ?? 0;
  const text = getResponseContent(json);

  return {
    text,
    usage,
  };
}

function getCreatePostPrompt(title: string) {
  return `
    Write a blog post under 500 words whose title is "${title}".
  `;
}

function getResponseContent(response: CreateChatCompletionResponse) {
  return (response.choices ?? []).reduce((acc, choice) => {
    return acc + (choice.message?.content ?? '');
  }, '');
}
