import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'

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

export default defineConfig(({ command }) => {
  return {
    // Use '/' for local dev, and '/mpt-portfolio/' for production builds
    base: command === 'build' ? '/mpt-portfolio/' : '/',
    build: {
      rollupOptions: {
        input: getHtmlEntries(),
      },
    },
    plugins: [
      {
        name: 'force-reload-html',
        handleHotUpdate({ file, server }) {
          if (file.endsWith('.html')) {
            server.ws.send({
              type: 'full-reload',
              path: '*',
            })
          }
        },
      },
    ],
  }
})