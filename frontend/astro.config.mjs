import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
        prefixDefaultLocale: false
    }
  },
  server: {
    port: 3000
  }
});
