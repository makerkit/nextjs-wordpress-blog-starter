import { use } from 'react';
import Link from 'next/link';

import wpService from '@/lib/wordpress/wp-service';

interface HomePageParams {
  searchParams: {
    page?: string;
  };
}

export default function Home({ searchParams }: HomePageParams) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { posts, totalPages } = use(wpService.getPosts({ page }));

  return (
    <div className={'container mx-auto my-8'}>
      <div className={'flex flex-col space-y-8'}>
        <h1 className={'text-xl xl:text-2xl font-bold'}>Posts</h1>

        <div
          className={
            'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8'
          }
        >
          {posts.map((post) => (
            <div className={'flex flex-col space-y-5'} key={post.id}>
              <Link href={`/posts/${post.slug}`}>
                <h2>{post.title.rendered}</h2>
                <span>{post.excerpt.protected}</span>
              </Link>
            </div>
          ))}
        </div>

        <PaginationLinks currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
}

function PaginationLinks({
  currentPage,
  totalPages,
}: React.PropsWithChildren<{
  currentPage: number;
  totalPages: number;
}>) {
  const pagesArray = Array(totalPages)
    .fill(null)
    .map((_, page) => page + 1);

  return (
    <div className={'flex space-x-4'}>
      {pagesArray.map((page) => {
        const isSelected = page === currentPage;
        const className = isSelected ? 'font-bold' : 'hover:font-medium';

        return (
          <Link key={page} className={className} href={`/?page=${page}`}>
            {page}
          </Link>
        );
      })}
    </div>
  );
}
