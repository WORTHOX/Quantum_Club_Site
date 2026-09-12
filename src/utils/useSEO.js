import { useEffect } from 'react'

const DEFAULT_SITE_URL = 'https://symbiosisquantumclub.vercel.app'
const DEFAULT_SITE_NAME = 'Symbiosis Quantum Club'
const DEFAULT_IMAGE = `${DEFAULT_SITE_URL}/og-image.png`
const DEFAULT_KEYWORDS = 'Symbiosis Quantum Club, SQC, IBM Qiskit Fall Fest, quantum computing India, Qiskit, quantum hackathon, Symbiosis Institute of Technology, SIT Pune, quantum workshops, student quantum club'

function upsertMeta(selector, attributes, content) {
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    Object.entries(attributes).forEach(([k, v]) => el.setAttribute(k, v))
    document.head.appendChild(el)
  }
  if (content !== undefined && content !== null) {
    el.setAttribute('content', content)
  }
  return el
}

function upsertLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  if (href) {
    el.setAttribute('href', href)
  }
  return el
}

/**
 * useSEO — Comprehensive SEO Hook
 *
 * Dynamically synchronizes document title, description, keywords, canonical link,
 * Open Graph (Facebook/LinkedIn/Discord), Twitter Cards, robots directives,
 * and Schema.org JSON-LD structured data on client-side route transitions.
 */
export function useSEO({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  twitterCard = 'summary_large_image',
  noindex = false,
  structuredData = null,
}) {
  useEffect(() => {
    // 1. Title
    const formattedTitle = title
      ? (title.includes('Symbiosis Quantum Club') ? title : `${title} | Symbiosis Quantum Club`)
      : 'Symbiosis Quantum Club — IBM Qiskit Fall Fest | Quantum Computing India'
    document.title = formattedTitle

    // 2. Canonical URL
    const canonicalUrl = canonical
      ? (canonical.startsWith('http') ? canonical : `${DEFAULT_SITE_URL}${canonical.startsWith('/') ? '' : '/'}${canonical}`)
      : window.location.href.split('?')[0].split('#')[0]
    upsertLink('canonical', canonicalUrl)

    // 3. Primary Meta Tags
    if (description) {
      upsertMeta('meta[name="description"]', { name: 'description' }, description)
    }
    upsertMeta(
      'meta[name="keywords"]',
      { name: 'keywords' },
      keywords ? `${keywords}, ${DEFAULT_KEYWORDS}` : DEFAULT_KEYWORDS
    )
    upsertMeta(
      'meta[name="robots"]',
      { name: 'robots' },
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    )

    // 4. Open Graph Meta Tags
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, DEFAULT_SITE_NAME)
    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, ogType)
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, formattedTitle)
    if (description) {
      upsertMeta('meta[property="og:description"]', { property: 'og:description' }, description)
    }
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl)
    
    const absoluteImage = ogImage.startsWith('http')
      ? ogImage
      : `${DEFAULT_SITE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`
    upsertMeta('meta[property="og:image"]', { property: 'og:image' }, absoluteImage)

    // 5. Twitter Card Meta Tags
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, twitterCard)
    upsertMeta('meta[name="twitter:site"]', { name: 'twitter:site' }, '@SymbQuantum')
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, formattedTitle)
    if (description) {
      upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description)
    }
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, absoluteImage)

    // 6. Structured Data (JSON-LD)
    const scriptId = 'seo-dynamic-structured-data'
    let scriptEl = document.getElementById(scriptId)

    if (structuredData) {
      if (!scriptEl) {
        scriptEl = document.createElement('script')
        scriptEl.id = scriptId
        scriptEl.type = 'application/ld+json'
        document.head.appendChild(scriptEl)
      }
      scriptEl.textContent = JSON.stringify(structuredData)
    } else if (scriptEl) {
      scriptEl.remove()
    }

    // Scroll to top upon page navigation
    window.scrollTo(0, 0)

    // Cleanup when component unmounts: remove dynamic JSON-LD
    return () => {
      const dynamicScript = document.getElementById(scriptId)
      if (dynamicScript) {
        dynamicScript.remove()
      }
    }
  }, [title, description, keywords, canonical, ogType, ogImage, twitterCard, noindex, structuredData])
}

export default useSEO
