import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import https from 'https'

export default async function sitemap(req, res) {
  const hostname = 'https://rsud.probolinggokota.go.id'

  const staticLinks = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/beranda', changefreq: 'daily', priority: 1.0 },
    { url: '/berita', changefreq: 'daily', priority: 1.0 },
    { url: '/pelayanan', changefreq: 'weekly', priority: 0.7 },
    { url: '/pokja', changefreq: 'weekly', priority: 0.7 },
    { url: '/ppid', changefreq: 'weekly', priority: 0.7 },
    { url: '/profile', changefreq: 'weekly', priority: 0.7 }
  ]

  let beritaLinks = []

  try {
    const response = await fetch('https://rsudmochsaleh.my.id/api/v1/berita/berita_paginate?category=all&page=1&perPage=50&orderBy=created_at&sort=desc', {
      agent: new https.Agent({ rejectUnauthorized: false }) // hanya jika SSL tidak valid
    })

    const json = await response.json()

    const items = json.data?.data || []

    beritaLinks = items.map(item => ({
      url: `/berita/${item.slug}`,
      changefreq: 'weekly',
      priority: 0.6,
      lastmod: item.updated_at || item.created_at
    }))
  } catch (err) {
    console.error('Gagal ambil berita dari API:', err.message)
  }

  const links = [...staticLinks, ...beritaLinks]

  const stream = new SitemapStream({ hostname })
  res.setHeader('Content-Type', 'application/xml')
  const xml = await streamToPromise(Readable.from(links).pipe(stream))
  res.end(xml.toString())
}
