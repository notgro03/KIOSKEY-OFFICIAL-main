import { defineConfig } from 'vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import { globSync } from 'glob'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Get all HTML files
const htmlFiles = globSync('{pages,}/*.html').reduce((acc, file) => {
  const name = file.replace(/^pages\//, '').replace('.html', '')
  acc[name] = resolve(__dirname, file)
  return acc
}, {})

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: htmlFiles,
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: {
          vendor: ['src/js/utils.js'],
          components: [
            'src/js/components/Navigation.js',
            'src/js/components/Carousel.js'
          ]
        }
      }
    },
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/js/components'),
      '@utils': resolve(__dirname, 'src/js/utils'),
      '@styles': resolve(__dirname, 'css'),
      '@assets': resolve(__dirname, 'public')
    }
  },
  server: {
    open: true,
    port: 3000,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  preview: {
    port: 8080
  },
  plugins: [],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        cssnano({
          preset: ['default', {
            discardComments: { removeAll: true }
          }]
        })
      ]
    }
  }
})