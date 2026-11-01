import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The repo root holds plain-text files named `login`, `register` and `build`
// (course deliverables). In dev mode Vite would serve them as static files and
// shadow the /login route, so route those paths back to the SPA.
const spaRoutesOverRootFiles = () => ({
  name: 'spa-routes-over-root-files',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (/^\/stayhealthy\/(login|register|build)\/?$/.test(req.url)) {
        req.url = '/stayhealthy/';
      }
      next();
    });
  },
});

// `base` must match the GitHub Pages sub-path: https://<user>.github.io/stayhealthy/
export default defineConfig({
  plugins: [react(), spaRoutesOverRootFiles()],
  base: '/stayhealthy/',
});
