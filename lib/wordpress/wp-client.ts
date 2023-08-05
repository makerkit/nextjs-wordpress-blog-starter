import {
  WP_REST_API_Post as Post,
  WP_Post_Status_Name as PostStatus,
} from 'wp-types';

const API_BASE_URL =
  process.env.WORDPRESS_API_BASE_URL ?? 'http://localhost:8080/wp-json';

const API_VERSION = process.env.WORDPRESS_API_VERSION ?? 'v2';
const BASE_URL = `${API_BASE_URL}/wp/${API_VERSION}/`;

const DEFAULT_POSTS_PARAMS = {
  per_page: 2,
  page: 1,
  search: '',
  slug: <string[]>[],
};

type GetPostsParams = Partial<typeof DEFAULT_POSTS_PARAMS>;

export default class WpClient {
  constructor(
    private readonly username: string,
    private readonly password: string,
  ) {}

  async getPosts(params: Partial<typeof DEFAULT_POSTS_PARAMS> = {}): Promise<{
    posts: Post[];
    totalPages: number;
  }> {
    const queryParams = this.queryString({
      ...DEFAULT_POSTS_PARAMS,
      ...params,
    });

    const url = `${BASE_URL}posts${queryParams}`;
    const response = await fetch(url);
    const totalPagesHeader = response.headers.get('X-WP-TotalPages');
    const totalPages = totalPagesHeader ? Number(totalPagesHeader) : 0;
    const posts = await response.json();

    return {
      posts,
      totalPages,
    };
  }

  async getPost(id: number): Promise<Post> {
    const response = await fetch(`${BASE_URL}posts/${id}`);

    return response.json();
  }

  async insertPost(params: {
    title: string;
    content: string;
    status: PostStatus;
    excerpt?: string;
  }) {
    const url = `${BASE_URL}posts`;
    const headers = this.getHeaders();

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Failed to insert post: ${response.statusText}`);
    }

    return response.json();
  }

  private getHeaders() {
    const auth = this.createWordpressBasicAuthHeader(
      this.username,
      this.password,
    );

    return {
      Authorization: auth,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  private createWordpressBasicAuthHeader(username: string, password: string) {
    const buffer = Buffer.from(`${username}:${password}`, 'binary');
    const encoded = buffer.toString('base64');

    return `Basic ${encoded}`;
  }

  private queryString(params: Record<string, string | string[] | number>) {
    const queryParams = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key].toString())}`)
      .join('&');

    return queryParams ? `?${queryParams}` : '';
  }
}
