import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `https://answerright.vercel.app/`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `https://answerright.vercel.app/about`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        {
            url: `https://answerright.vercel.app/chat`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
          url: `https://answerright.vercel.app/changelog`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.6,
      }
    ]
}
