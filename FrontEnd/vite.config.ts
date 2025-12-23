import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  preview: {
    allowedHosts: ['3c08f27d686e.ngrok-free.app'],
  },
})

