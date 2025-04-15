import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `https://web-aether.vercel.app`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `https://web-aether.vercel.app/about`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        {
            url: `https://web-aether.vercel.app/chat`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
          url: `https://web-aether.vercel.app/changelog`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.6,
      }
    ]
}
