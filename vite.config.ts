import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Social-preview tags (og:image, og:url) must be absolute URLs.
 * The GitHub Pages workflow passes SITE_URL (e.g. https://user.github.io/repo);
 * locally it falls back to relative paths.
 */
function siteUrlPlugin(siteUrl: string): Plugin {
  const absolute = /^https?:\/\//.test(siteUrl)
  return {
    name: 'site-url',
    transformIndexHtml(html) {
      if (!absolute) {
        // No public URL known (local build): drop tags that require an absolute URL.
        html = html.replace(/\s*<link rel="canonical"[^>]*>/, '').replace(/\s*<meta property="og:url"[^>]*>/, '')
      }
      return html.replaceAll('%SITE_URL%', absolute ? siteUrl : '.')
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.SITE_URL || '').replace(/\/$/, '')
  return {
    // Relative base: works on a user site (user.github.io) and on any project
    // path (user.github.io/any-repo-name) without editing this file.
    base: '/olesia-portfolio',
    plugins: [react(), siteUrlPlugin(siteUrl)],
    build: {
      target: 'es2020',
      assetsInlineLimit: 2048,
    },
  }
})
