import { use } from 'react';
import { notFound } from 'next/navigation';

import wpService from '@/lib/wordpress/wp-service';

interface PostPageParams {
  params: {
    slug: string;
  };
}

function PostPage({ params }: PostPageParams) {
  const { posts } = use(
    wpService.getPosts({
      slug: [params.slug],
    }),
  );

  const post = posts ? posts[0] : null;

  if (!post) {
    notFound();
  }

  return (
    <div className={'my-8 container mx-auto'}>
      <div className={'flex flex-col space-y-4'}>
        <div className={'flex flex-col space-y-2'}>
          <h1 className={'text-3xl font-semibold'}>{post.title.rendered}</h1>
          <h2 className={'text-xl font-semibold'}>{post.excerpt.raw}</h2>
        </div>

        <div>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
      </div>
    </div>
  );
}

export default PostPage;

export async function generateStaticParams() {
  const { posts } = await wpService.getPosts({
    per_page: 100,
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
