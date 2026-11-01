import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The repo root holds plain-text files named `login`, `register` and `build`
// (course deliverables). In dev mode Vite would serve them as static files and
// shadow the /login route, so route those paths back to the SPA.
const spaRoutesOverRootFiles = () => ({
  name: 'spa-routes-over-root-files',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (/^\/med_appt\/(login|register|build)\/?$/.test(req.url)) {
        req.url = '/med_appt/';
      }
      next();
    });
  },
});

// `base` must match the GitHub Pages sub-path: https://<user>.github.io/med_appt/
// The production build goes to server/build so the Express server can serve it.
export default defineConfig({
  plugins: [react(), spaRoutesOverRootFiles()],
  base: '/med_appt/',
  build: { outDir: 'server/build', emptyOutDir: true },
});
