import { WP_Post_Status_Name as PostStatus } from 'wp-types';
import './env';

import { generatePostContent } from '@/lib/generate-content';
import wpService from '@/lib/wordpress/wp-service';

async function main() {
  const title = process.argv[2];

  if (!title) {
    throw new Error('Please provide a title');
  }

  console.log(`Generating content for post "${title}"...`);

  const { text, usage } = await generatePostContent({ title });

  console.log(`Usage: ${usage} tokens`);

  await wpService.insertPost({
    title,
    content: text,
    status: 'publish' as PostStatus,
  });

  console.log(`Post "${title}" successfully created`);
}

// run the script with `npx tsx scripts/generate.ts "My Blog Post"`
void main();
