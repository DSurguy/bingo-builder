import { defineConfig, UserConfigExport, loadEnv } from 'vite'
import reactPlugin from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command, mode }) => {
  let config: UserConfigExport = {
    plugins: [
      reactPlugin(),
      {
        name: 'inject-scripts-html',
        transformIndexHtml: () => {
          const env = loadEnv(mode, process.cwd());
          let tags = [];
          if( env['VITE_GOOGLE_RECAPTCHA_KEY'] )
            tags.push({
              tag: 'script',
              attrs: {
                'src': `https://www.google.com/recaptcha/api.js?render=${env['VITE_GOOGLE_RECAPTCHA_KEY']}`
              }
            })
          return tags;
        }
      }
    ],
    build: {}
  }
  if( command === 'serve' || mode === 'development' ) {
    config.build.sourcemap = true;
  }

  return config;
})
