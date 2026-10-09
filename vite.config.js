import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'

// Automatically find all .html files in the root folder
function getHtmlEntries() {
  const entries = {}
  const files = fs.readdirSync(__dirname)

  files.forEach((file) => {
    if (file.endsWith('.html')) {
      const name = file.replace('.html', '')
      entries[name] = resolve(__dirname, file)
    }
  })

  return entries
}

export default defineConfig({
  base: './', // Essential for GitHub Actions deployment
  build: {
    rollupOptions: {
      input: getHtmlEntries(), // Automatically registers every .html file you add!
    },
  },
  plugins: [
    {
      name: 'force-reload-html',
      handleHotUpdate({ file, server }) {
        // Whenever any .html file changes, force a full browser reload
        if (file.endsWith('.html')) {
          server.ws.send({
            type: 'full-reload',
            path: '*',
          })
        }
      },
    },
  ],
})