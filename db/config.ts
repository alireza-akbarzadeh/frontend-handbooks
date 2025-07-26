import { defineDb } from 'astro:db';
import { Comment } from './schemas/comment';
// https://astro.build/db/config
export default defineDb({
  tables: {
    Comment,
  },
});
