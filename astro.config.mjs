// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';
import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx(),db()],

  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
