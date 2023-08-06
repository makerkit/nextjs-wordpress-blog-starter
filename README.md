# Next.js Wordpress Blog Starter

This is a minimal starter template for a Next.js blog powered by 
headless Wordpress. 

This project also includes a script to generate posts with ChatGPT 
and insert them into the Wordpress database using the Wordpress REST API.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run Docker

To run the Wordpress server in a Docker container, run the following command:

```bash
docker-compose up
```

You should now see the Wordpress site at [http://localhost:8080](http://localhost:8080).

## Generate Posts

To generate posts with ChatGPT and insert them into the Wordpress database, run the following command:

```bash
npm run generate -- "Your post title"
```

Assuming you have a Wordpress server running at [http://localhost:8080]
(http://localhost:8080), you should now see the post at 
[http://localhost:8080/your-post-title]
(http://localhost:8080/your-post-title). ChatGPT will generate a post with 
the provided title and insert it into the database.

To tweak the prompt, update the `lib/generate-post.ts` file with your 
desired prompt.

## Learn More

To learn more about this setup, read the blog post [Building an AI-powered Blog with Next.js and WordPress](https://makerkit.dev/blog/tutorials/nextjs-wordpress-blog).