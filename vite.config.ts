import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [
      vue(),
  ],
    css: {
        postcss: './postcss.config.cjs',
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../"),
            "@server": path.resolve(__dirname, "../server/src"),
        },
    },

})

