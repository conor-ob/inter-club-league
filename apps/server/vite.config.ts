import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

export default defineConfig({
  server: {
    port: process.env.NODE_ENV === 'production' ? 8080 : 3000
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/index.ts'
    })
  ],
  optimizeDeps: {
    exclude: ['next']
  }
})
