import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      plugins: [
        react(),
        dts({ include: ['src'], rollupTypes: true }),
      ],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'inkmotion',
          formats: ['es', 'cjs'],
          fileName: (format) => `inkmotion.${format}.js`,
        },
        rollupOptions: {
          external: ['react', 'react/jsx-runtime', 'react-dom'],
          output: {
            globals: { react: 'React', 'react-dom': 'ReactDOM' },
          },
        },
      },
    }
  }

  // Dev server — serve the demo app
  return {
    plugins: [react()],
  }
})
