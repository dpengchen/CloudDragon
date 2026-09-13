import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { WeappTailwindcss } from 'weapp-tailwindcss/vite'

const projectRoot = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    uni(),
    WeappTailwindcss({
      cssOptions: {
        rem2rpx: true,
      },
      tailwindcssBasedir: projectRoot,
      cssEntries: [
        resolve(projectRoot, 'src/app.css'),
      ],
    })
  ],
})