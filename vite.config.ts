import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import dotenv from "dotenv"
dotenv.config()

const {PORT}:any = process.env
export default defineConfig({
  server: {
    port: PORT || 8081
  },
  plugins: [ 
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/app.ts',
      exportName: 'viteNodeApp',
      tsCompiler: 'esbuild',
      swcOptions: {}
    })
  ],
  optimizeDeps: {
  },
});