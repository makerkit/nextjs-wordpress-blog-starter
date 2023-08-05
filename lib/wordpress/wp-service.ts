import WpClient from "./wp-client";

const WORDPRESS_USERNAME = process.env.WORDPRESS_USERNAME;
const WORDPRESS_PASSWORD = process.env.WORDPRESS_PASSWORD;

if (!WORDPRESS_USERNAME || !WORDPRESS_PASSWORD) {
  throw new Error(
    "Please provide a WORDPRESS_USERNAME and WORDPRESS_PASSWORD environment variables",
  );
}

const wpService = new WpClient(WORDPRESS_USERNAME, WORDPRESS_PASSWORD);

export default wpService;
