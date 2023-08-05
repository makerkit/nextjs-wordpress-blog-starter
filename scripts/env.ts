import { config } from 'dotenv';

// read .env.local variables
config({
  path: '.env.local',
  debug: true,
});
