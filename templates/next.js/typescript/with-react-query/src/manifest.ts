import type { MetadataRoute } from 'next'
import { themeConfig } from './constant/themeConfig'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: themeConfig.appName,
    short_name: themeConfig.appName,
    description: themeConfig.appDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon'
      }
    ]
  }
}
