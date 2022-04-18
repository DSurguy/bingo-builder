import { defineConfig, UserConfigExport } from 'vite'
import reactPlugin from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command, mode }) => {
  let config: UserConfigExport = {
    plugins: [reactPlugin()],
    build: {}
  }
  if( command === 'serve' || mode === 'development' ) {
    config.build.sourcemap = true;
  }

  return config;
})
