import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/config/site';

// Fecha de la última actualización real del contenido del sitio.
// Actualizar manualmente cada vez que se agreguen proyectos o se modifique contenido importante.
const LAST_CONTENT_UPDATE = new Date('2026-08-10');

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  return [
    {
      url: baseUrl,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];
}

