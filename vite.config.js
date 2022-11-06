import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png', 'maskable_icon.png'],
    manifest: {
      name: 'DiscountMapper',
      short_name: 'DiscountMapper',
      description: 'App for finding time-sensitive discounts',
      theme_color: '#ffffff',
      icons: [
        {
          "src": "/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/android-chrome-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        },
        {
          "src": "/safari-pinned-tab.svg",
          "sizes": "512x512",
          "type": "image/svg+xml",
          "purpose": "maskable"
        },
      ],
      background_color: "#ffffff",
      display: "standalone"
    }
  })]
})
