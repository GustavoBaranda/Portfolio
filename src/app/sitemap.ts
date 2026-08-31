import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/config/site';

// Fecha de la última actualización real del contenido del sitio.
const LAST_CONTENT_UPDATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  return [
    {
      url: baseUrl,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
