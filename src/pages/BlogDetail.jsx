import { useEffect, useState, useMemo, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import blogData from '../data/blog.json'
import useSEO from '../utils/useSEO'

export default function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Find post matching URL parameter (id or slug)
  const post = useMemo(() => {
    return blogData.find((p) => p.id === id || p.slug === id) || blogData[0]
  }, [id])

  // Get deep article detail content from post object or fallback
  const details = useMemo(() => {
    return {
      leadSummary: post.leadSummary || post.excerpt,
      takeaways: post.takeaways || [
        'In-depth experimental analysis by Symbiosis Quantum Club research fellows.',
        'Zero-laser quantum photon generation demonstrated under daylight conditions.',
        'High-fidelity state alignment verified with Bell inequality violation test.'
      ],
      sections: post.sections || [
        {
          title: '1. Overview & Research Context',
          content: post.excerpt,
          quote: 'Pioneering quantum innovation requires open collaboration across research, software, and hardware disciplines.'
        }
      ],
      tags: post.tags || [`#${post.category.replace(/\s+/g, '')}`, '#SymbiosisQuantum', '#Research', '#Optics']
    }
  }, [post])

  // Author metadata
  const authorName = typeof post.author === 'object' ? post.author.name : post.author
  const authorRole = typeof post.author === 'object' ? post.author.role : post.authorRole || 'Quantum Research Fellow'
  const authorDepartment = typeof post.author === 'object' && post.author.department ? post.author.department : 'Quantum Optics & Research'
  const authorLinkedin = typeof post.author === 'object' ? post.author.linkedin : `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(authorName + ' Symbiosis Quantum Club')}`

  // Memoized JSON-LD structured data to avoid unnecessary hook re-evaluations
  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    'headline': post.title,
    'description': details.leadSummary,
    'image': post.image,
    'datePublished': post.date,
    'author': {
      '@type': 'Person',
      'name': authorName,
      'jobTitle': authorRole
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Symbiosis Quantum Club',
      'url': 'https://symbiosisquantumclub.vercel.app'
    }
  }), [post, details.leadSummary, authorName, authorRole])

  // Comprehensive SEO hook
  useSEO({
    title: `${post.title} — Symbiosis Quantum Club Journal`,
    description: details.leadSummary || post.excerpt,
    canonical: `/blog/${post.slug || post.id}`,
    keywords: `${post.category}, Symbiosis Quantum Club, quantum computing research, SIT Pune, ${details.tags.join(', ')}`,
    image: post.image,
    type: 'article',
    author: authorName,
    publishedTime: post.date,
    structuredData
  })

  // ── Reading states ──
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [fontSize, setFontSize] = useState('normal') // 'normal' | 'large' | 'xlarge'
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedCode, setCopiedCode] = useState(null)
  const [copiedCitation, setCopiedCitation] = useState(false)
  const [citationFormat, setCitationFormat] = useState('bibtex') // 'bibtex' | 'apa'
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Calculate estimated total words & reading speed
  const wordCount = useMemo(() => {
    const text = [
      post.title,
      details.leadSummary,
      ...details.sections.map((s) => `${s.title} ${s.content} ${s.quote || ''}`)
    ].join(' ')
    return text.trim().split(/\s+/).length
  }, [post, details])

  // Guarantee body scrollability on mount and unmount
  useEffect(() => {
    document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Scroll to top on post switch
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [post])

  // Track reading progress along page (rAF throttled for 120fps performance)
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight
          if (totalHeight > 0) {
            const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100))
            setScrollProgress(progress)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock scroll during lightbox only
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
      const handleEsc = (e) => {
        if (e.key === 'Escape') setLightboxOpen(false)
      }
      window.addEventListener('keydown', handleEsc)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleEsc)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [lightboxOpen])

  // Track active section for Table of Contents with IntersectionObserver
  useEffect(() => {
    const sectionElements = details.sections.map((_, idx) =>
      document.getElementById(`article-section-${idx}`)
    ).filter(Boolean)

    if (sectionElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-section-index'))
            if (!isNaN(index)) {
              setActiveSection(index)
            }
          }
        })
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1
      }
    )

    sectionElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [details.sections])

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }

  // Copy link handler
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 3000)
  }

  // Copy code snippet helper
  const handleCopyCode = (snippet, index) => {
    navigator.clipboard.writeText(snippet)
    setCopiedCode(index)
    setTimeout(() => setCopiedCode(null), 2500)
  }

  // BibTeX and APA citation text
  const citationTexts = useMemo(() => {
    const pubYear = new Date(post.date).getFullYear()
    const slug = post.slug || post.id
    return {
      bibtex: `@article{sqc_${slug.replace(/-/g, '_')},\n  title   = {${post.title.replace(/[^\w\s-]/g, '')}},\n  author  = {${authorName}},\n  journal = {Symbiosis Quantum Club Dispatches},\n  volume  = {2},\n  number  = {1},\n  year    = {${pubYear}},\n  url     = {${typeof window !== 'undefined' ? window.location.href : `https://symbiosisquantumclub.vercel.app/blog/${slug}`}}\n}`,
      apa: `${authorName}. (${pubYear}). ${post.title.replace(/[^\w\s-]/g, '')}. Symbiosis Quantum Club Dispatches, 2(1). ${typeof window !== 'undefined' ? window.location.href : `https://symbiosisquantumclub.vercel.app/blog/${slug}`}`
    }
  }, [post, authorName])

  const handleCopyCitation = () => {
    const textToCopy = citationTexts[citationFormat]
    navigator.clipboard.writeText(textToCopy)
    setCopiedCitation(true)
    setTimeout(() => setCopiedCitation(false), 2500)
  }

  // Scroll smoothly to section
  const scrollToSection = (idx) => {
    const el = document.getElementById(`article-section-${idx}`)
    if (el) {
      const yOffset = -110 // clear fixed header
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // Font size class mapping
  const contentFontSizeClass = {
    normal: 'text-[1.0625rem] sm:text-[1.125rem] leading-[1.82]',
    large: 'text-[1.1875rem] sm:text-[1.25rem] leading-[1.88]',
    xlarge: 'text-[1.3125rem] sm:text-[1.375rem] leading-[1.95]'
  }[fontSize]

  // Related posts (excluding current post)
  const relatedPosts = useMemo(() => {
    return blogData.filter((p) => p.id !== post.id && p.slug !== post.slug).slice(0, 3)
  }, [post])

  return (
    <main className="bg-[#070a08] min-h-screen text-slate-200 relative selection:bg-[#34d399]/30 selection:text-white pb-32 overflow-x-clip">
      
      {/* ── 1. Top Reading Progress Bar (Apple-style subtle glow beam) ── */}
      <div 
        className="fixed top-20 left-0 right-0 h-[2.5px] bg-white/[0.04] z-40 pointer-events-none"
        aria-hidden="true"
      >
        <div 
          className="h-full bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#06b6d4] shadow-[0_0_12px_rgba(52,211,153,0.7)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── Dotted Matrix Ambient Grid (Consistent with SQC Design System) ── */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] opacity-70 pointer-events-none z-0" 
        aria-hidden="true" 
      />

      {/* ── Soft Emerald Radial Glow Behind Hero ── */}
      <div 
        className="absolute top-28 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#10b981]/12 via-[#06b6d4]/05 to-transparent rounded-full blur-3xl pointer-events-none z-0" 
        aria-hidden="true"
      />

      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 pt-28 sm:pt-32">
        
        {/* ── 2. Breadcrumb Navigation & Back Pill ── */}
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-4" aria-label="Breadcrumb">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <Link 
              to="/" 
              className="hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-white/20">/</span>
            <Link 
              to="/blog" 
              className="hover:text-white transition-colors duration-200"
            >
              Journal
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-[#34d399] font-medium truncate max-w-[180px] sm:max-w-[320px]">
              {post.category}
            </span>
          </div>

          {/* Minimalist Back Button */}
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121513]/90 border border-white/10 hover:border-[#34d399]/40 text-slate-300 hover:text-white font-mono text-xs transition-all duration-200 backdrop-blur-md shadow-sm active:scale-95"
          >
            <svg 
              className="w-3.5 h-3.5 text-[#34d399] group-hover:-translate-x-0.5 transition-transform duration-200" 
              viewBox="0 0 16 16" 
              fill="none" 
              aria-hidden="true"
            >
              <path d="M11 8H5M5 8L8.5 11.5M5 8L8.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>All Articles</span>
          </Link>
        </nav>

        {/* ── 3. Article Header (Apple Editorial Typography & Hierarchy) ── */}
        <header className="max-w-4xl mx-auto mb-10 text-left">
          
          {/* Category & Status Pill Lockup */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider bg-[#10b981]/15 text-[#34d399] border border-[#10b981]/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
              {post.category}
            </span>
            <span className="font-mono text-xs text-slate-400 font-medium">
              {formatDate(post.date)}
            </span>
            <span className="text-white/20 hidden xs:inline">•</span>
            <span className="font-mono text-xs text-slate-400 font-medium hidden xs:inline">
              {post.readTime}
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="font-mono text-xs text-slate-500 font-medium hidden sm:inline">
              ~{wordCount} words
            </span>
            <span className="text-white/20 hidden md:inline">•</span>
            <span className="font-mono text-[11px] text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded-md uppercase tracking-wider hidden md:inline">
              Peer-Reviewed Insight
            </span>
          </div>

          {/* Article Title — Title/Sentence Case with High Presence & Balance */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.12] mb-6 [text-wrap:balance]">
            {post.title}
          </h1>

          {/* Lead Summary Deck */}
          <p className="font-body text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-[65ch] border-l-2 border-[#34d399] pl-5 py-0.5 mb-8 text-left">
            {details.leadSummary}
          </p>

          {/* Author Byline Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/[0.08]">
            <div className="flex items-center gap-3.5">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#121513] border-2 border-[#34d399]/40 overflow-hidden shadow-md shrink-0 flex items-center justify-center text-[#34d399] font-display font-bold text-base">
                {typeof post.author === 'object' && post.author.avatar ? (
                  <img src={post.author.avatar} alt={authorName} className="w-full h-full object-cover" />
                ) : (
                  authorName.charAt(0)
                )}
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#10b981] border-2 border-[#070a08]" title="Verified SQC Fellow" />
              </div>
              
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm sm:text-base font-bold text-white">
                    {authorName}
                  </span>
                  <a 
                    href={authorLinkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-[#0a66c2] transition-colors"
                    aria-label={`${authorName} LinkedIn profile`}
                  >
                    <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
                <span className="font-mono text-xs text-slate-400">
                  {authorRole} <span className="text-white/20">•</span> {authorDepartment}
                </span>
              </div>
            </div>

            {/* Quick Share / Copy Action */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#34d399]/40 text-slate-300 hover:text-white font-mono text-xs transition-all duration-200 active:scale-95 cursor-pointer"
                title="Copy article URL"
              >
                <span>{copiedLink ? '✓ Copied' : 'Copy Link'}</span>
              </button>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#0a66c2]/50 text-slate-300 hover:text-white font-mono text-xs transition-all duration-200 active:scale-95"
                title="Share on LinkedIn"
              >
                <span>LinkedIn</span>
                <span className="text-[#34d399] font-bold">↗</span>
              </a>
            </div>
          </div>
        </header>

        {/* ── 4. Hero Image Showcase with Lightbox Inspection ── */}
        <div className="max-w-5xl mx-auto mb-14">
          <div 
            onClick={() => setLightboxOpen(true)}
            className="group relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-[#121513] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(16,185,129,0.08)] cursor-pointer transition-all duration-300 hover:border-[#34d399]/50"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setLightboxOpen(true)
              }
            }}
            aria-label="Click to enlarge research figure"
          >
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-700 ease-out brightness-[0.97] contrast-[1.03] group-hover:scale-[1.02]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070a08]/85 via-transparent to-black/20 pointer-events-none" />

            {/* Bottom Figure Caption */}
            <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none">
              <span className="font-mono text-[10px] sm:text-xs text-slate-300 bg-[#070a08]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 truncate max-w-[80%]">
                {post.imageCaption || `FIGURE 1.0 — ${post.category.toUpperCase()} RESEARCH APPARATUS`}
              </span>

              {/* Click to expand badge */}
              <span className="font-mono text-[10px] sm:text-xs text-[#34d399] bg-[#121513]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#34d399]/30 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                <span>Expand</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* ── 5. Main 2-Column Reading Layout (Left Reading Stream, Right Apple Sticky Sidebar) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] xl:grid-cols-[1fr_330px] gap-12 lg:gap-14 max-w-5xl mx-auto items-start">
          
          {/* Left Main Article Stream (Constrained 65–70ch for Optimal Typography) */}
          <article className="flex flex-col gap-10 max-w-[70ch] w-full mx-auto lg:mx-0">
            
            {/* Executive Summary / Key Takeaways Box (Apple Cupertino Glass Style) */}
            {details.takeaways && details.takeaways.length > 0 && (
              <section 
                aria-labelledby="takeaways-heading"
                className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#10b981]/12 via-[#121513]/90 to-[#070a08] border border-[#10b981]/30 shadow-[0_12px_36px_rgba(0,0,0,0.5)] flex flex-col gap-4 overflow-hidden"
              >
                {/* Subtle Ambient Light Reflection */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#34d399]/10 to-transparent pointer-events-none rounded-full blur-2xl" />

                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#34d399] uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#34d399] shadow-[0_0_8px_#34d399]" />
                    <h2 id="takeaways-heading" className="font-mono text-xs font-bold m-0 text-[#34d399]">
                      EXECUTIVE RESEARCH BRIEFING
                    </h2>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 uppercase">
                    3 Key Findings
                  </span>
                </div>

                <ol className="flex flex-col gap-4 m-0 pl-0 list-none font-body text-[0.9375rem] sm:text-base text-slate-300 leading-relaxed">
                  {details.takeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3.5">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/35 shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <span className="text-slate-200">{item}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Article Sections Stream */}
            {details.sections && details.sections.map((sec, idx) => (
              <section 
                key={idx} 
                id={`article-section-${idx}`}
                data-section-index={idx}
                className="flex flex-col gap-5 pt-8 border-t border-white/[0.08] first:border-t-0 first:pt-0 scroll-mt-28"
              >
                {/* Section Heading with Minimal Anchor Pill */}
                {sec.title && (
                  <div className="flex flex-col gap-1.5">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug m-0">
                      {sec.title}
                    </h2>
                  </div>
                )}

                {/* Section Body Paragraphs */}
                {sec.content && (
                  <div className={`font-body ${contentFontSizeClass} text-slate-300 space-y-5 whitespace-pre-line`}>
                    {sec.content}
                  </div>
                )}

                {/* Pullquote (Apple Editorial Glass Style) */}
                {sec.quote && (
                  <figure className="relative my-4 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border-l-4 border-[#34d399] border-y border-r border-white/10 shadow-lg">
                    <span className="absolute top-2 left-4 text-4xl font-serif text-[#34d399]/25 pointer-events-none select-none">
                      &ldquo;
                    </span>
                    <blockquote className="m-0 font-display text-lg sm:text-xl font-medium italic text-slate-100 leading-relaxed pl-3 sm:pl-4">
                      {sec.quote}
                    </blockquote>
                    <figcaption className="mt-3 font-mono text-xs text-[#34d399] uppercase tracking-wider pl-3 sm:pl-4">
                      — Research Log Annotation // SQC
                    </figcaption>
                  </figure>
                )}

                {/* Code / Primary Benchmark Citation Box (macOS Terminal Chassis Style) */}
                {sec.codeSnippet && (
                  <div className="mt-3 rounded-2xl bg-[#0d0f12] border border-white/12 shadow-xl overflow-hidden">
                    {/* Terminal Window Header Bar */}
                    <div className="px-4 py-2.5 bg-white/[0.03] border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                        <span className="ml-2 font-mono text-[11px] text-slate-400 font-medium">
                          citation-metadata.bib
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopyCode(sec.codeSnippet, idx)}
                        className="font-mono text-[11px] px-2.5 py-1 rounded bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        {copiedCode === idx ? (
                          <>
                            <span className="text-[#34d399]">✓</span>
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Monospace Code Output */}
                    <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] text-[#34d399] overflow-x-auto leading-relaxed">
                      <pre className="m-0"><code>{sec.codeSnippet}</code></pre>
                    </div>
                  </div>
                )}
              </section>
            ))}

            {/* ── Academic Citation Box (BibTeX / APA Tabs) ── */}
            <div className="mt-4 p-6 rounded-2xl bg-[#0e1210] border border-white/10 shadow-lg flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    Cite This Article
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 bg-white/[0.05] px-2 py-0.5 rounded">
                    Open Access
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/10">
                  <button
                    onClick={() => setCitationFormat('bibtex')}
                    className={`font-mono text-[11px] px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      citationFormat === 'bibtex' 
                        ? 'bg-[#34d399]/20 text-[#34d399] font-bold' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    BibTeX
                  </button>
                  <button
                    onClick={() => setCitationFormat('apa')}
                    className={`font-mono text-[11px] px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      citationFormat === 'apa' 
                        ? 'bg-[#34d399]/20 text-[#34d399] font-bold' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    APA
                  </button>
                </div>
              </div>

              <div className="bg-black/50 rounded-xl p-3.5 border border-white/[0.06] font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto select-all">
                {citationTexts[citationFormat]}
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-500">
                  Licensed under Creative Commons BY-NC 4.0
                </span>
                <button
                  onClick={handleCopyCitation}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#10b981]/15 hover:bg-[#10b981]/30 text-[#34d399] border border-[#10b981]/35 font-mono text-xs font-medium transition-all active:scale-95 cursor-pointer"
                >
                  {copiedCitation ? '✓ Citation Copied' : 'Copy Citation'}
                </button>
              </div>
            </div>

            {/* Tags & Topic Pills */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-col gap-3">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                Related Topics & Research Tags
              </span>
              <div className="flex flex-wrap gap-2">
                {details.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 rounded-full font-mono text-xs bg-[#121513] text-slate-300 border border-white/10 hover:border-[#34d399]/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Profile Bio Box */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#121513]/90 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#10b981]/20 to-transparent border border-[#10b981]/40 flex items-center justify-center font-display font-bold text-xl text-[#34d399] overflow-hidden shrink-0">
                  {typeof post.author === 'object' && post.author.avatar ? (
                    <img src={post.author.avatar} alt={authorName} className="w-full h-full object-cover" />
                  ) : (
                    authorName.charAt(0)
                  )}
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-white text-base sm:text-lg">{authorName}</span>
                    <span className="font-mono text-[10px] text-[#34d399] bg-[#34d399]/15 border border-[#34d399]/30 px-2 py-0.5 rounded-full uppercase">
                      Author
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    {authorRole} • Symbiosis Quantum Club
                  </span>
                  <span className="font-body text-xs text-slate-500">
                    Contributing research fellow at Symbiosis Institute of Technology (SIT), Pune.
                  </span>
                </div>
              </div>

              <a 
                href={authorLinkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/15 hover:bg-[#10b981] text-[#34d399] hover:text-[#041f14] border border-[#10b981]/30 font-mono text-xs font-bold transition-all duration-200 active:scale-95 shrink-0"
              >
                <span>LinkedIn Profile</span>
                <span>↗</span>
              </a>
            </div>

          </article>

          {/* ── 6. Right Sticky Sidebar (Apple Human Interface Guidelines Inspired) ── */}
          <aside className="hidden lg:flex flex-col gap-6 sticky top-28">
            
            {/* Reader Experience & Accessibility Controls */}
            <div className="p-5 rounded-2xl bg-[#121513]/90 border border-white/10 flex flex-col gap-4 backdrop-blur-xl shadow-lg">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                <span className="font-mono text-[11px] font-bold text-[#34d399] uppercase tracking-wider">
                  READER CONTROLS
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  {Math.round(scrollProgress)}% Read
                </span>
              </div>

              {/* Font Size Selector (Accessibility requirement) */}
              <div className="flex items-center justify-between gap-2 bg-black/40 p-1.5 rounded-xl border border-white/10">
                <span className="font-mono text-xs text-slate-400 pl-2">Text Size:</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`px-2.5 py-1 rounded font-mono text-xs transition-colors cursor-pointer ${
                      fontSize === 'normal' ? 'bg-[#34d399]/20 text-[#34d399] font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Standard Font Size"
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`px-2.5 py-1 rounded font-mono text-sm transition-colors cursor-pointer ${
                      fontSize === 'large' ? 'bg-[#34d399]/20 text-[#34d399] font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Larger Font Size"
                  >
                    A+
                  </button>
                  <button
                    onClick={() => setFontSize('xlarge')}
                    className={`px-2.5 py-1 rounded font-mono text-base transition-colors cursor-pointer ${
                      fontSize === 'xlarge' ? 'bg-[#34d399]/20 text-[#34d399] font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Extra Large Font Size"
                  >
                    A++
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={handleCopyLink}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#34d399]/40 text-slate-200 font-mono text-xs flex items-center justify-between transition-all duration-200 cursor-pointer active:scale-98"
                >
                  <span>{copiedLink ? '✓ Copied URL' : 'Copy Article Link'}</span>
                  <svg className="w-3.5 h-3.5 text-[#34d399]" viewBox="0 0 16 16" fill="none">
                    <path d="M6 10L10 6M7 4h5v5M9 12H4V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#0a66c2]/50 text-slate-200 font-mono text-xs flex items-center justify-between transition-all duration-200"
                >
                  <span>Share on LinkedIn</span>
                  <span className="text-[#34d399] font-mono">↗</span>
                </a>
              </div>
            </div>

            {/* Interactive Table of Contents (TOC) */}
            {details.sections && details.sections.length > 0 && (
              <div className="p-5 rounded-2xl bg-[#121513]/90 border border-white/10 flex flex-col gap-3.5 backdrop-blur-xl shadow-lg">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                  <span className="font-mono text-[11px] font-bold text-[#34d399] uppercase tracking-wider">
                    CONTENTS OUTLINE
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    {details.sections.length} Sections
                  </span>
                </div>

                <nav className="flex flex-col gap-1.5" aria-label="Table of contents">
                  {details.sections.map((sec, idx) => {
                    const isActive = activeSection === idx
                    return (
                      <button
                        key={idx}
                        onClick={() => scrollToSection(idx)}
                        className={`text-left text-xs font-mono py-2 px-3 rounded-lg transition-all duration-200 flex items-start gap-2.5 cursor-pointer ${
                          isActive
                            ? 'bg-[#10b981]/15 text-[#34d399] border-l-2 border-[#34d399] font-medium'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                        }`}
                      >
                        <span className="shrink-0 mt-0.5 text-[10px] text-slate-500 font-semibold">
                          0{idx + 1}
                        </span>
                        <span className="truncate">
                          {sec.title?.replace(/^\d+\.\s*/, '') || `Section ${idx + 1}`}
                        </span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            )}

            {/* Publication Identity Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#10b981]/10 via-[#121513] to-[#070a08] border border-[#10b981]/25 flex flex-col gap-2.5 shadow-md text-left">
              <span className="font-mono text-[10px] font-bold text-[#34d399] uppercase tracking-widest">
                SYMBIOSIS QUANTUM DISPATCHES
              </span>
              <p className="font-body text-xs text-slate-400 leading-relaxed m-0">
                Official research dispatches authored by student researchers and mentors at Symbiosis Quantum Club, SIT Pune.
              </p>
              <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between font-mono text-[10px] text-slate-500">
                <span>ISSN 2984-SQC</span>
                <span>VOL. 2026</span>
              </div>
            </div>

          </aside>

        </div>

        {/* ── 7. Related Articles Recommendation (Apple Asymmetric Editorial Grid) ── */}
        {relatedPosts.length > 0 && (
          <section className="mt-28 pt-16 border-t border-white/10 flex flex-col gap-10 max-w-5xl mx-auto text-left">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#34d399] font-semibold block mb-1">
                  CONTINUE EXPLORING
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight m-0">
                  More Research From Quantum Journal
                </h2>
              </div>
              
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#34d399] hover:underline"
              >
                <span>Browse All Articles</span>
                <span>➔</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
              {relatedPosts.map((relPost) => (
                <Link 
                  key={relPost.id} 
                  to={`/blog/${relPost.id}`}
                  className="group flex flex-col bg-[#121215] border border-white/10 rounded-2xl overflow-hidden hover:border-[#34d399]/50 hover:shadow-[0_16px_36px_rgba(16,185,129,0.15)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-full aspect-[16/10] overflow-hidden relative bg-[#070a08]">
                    <img 
                      src={relPost.image} 
                      alt={relPost.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider bg-[#070a08]/80 text-[#34d399] border border-white/10 backdrop-blur-md">
                      {relPost.category}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col gap-2.5 flex-1 justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>{formatDate(relPost.date)}</span>
                        <span>{relPost.readTime}</span>
                      </div>
                      <h3 className="font-display text-base font-bold text-white group-hover:text-[#34d399] transition-colors leading-snug m-0 line-clamp-2">
                        {relPost.title}
                      </h3>
                      <p className="font-body text-xs text-slate-400 line-clamp-2 leading-relaxed m-0">
                        {relPost.excerpt}
                      </p>
                    </div>

                    <span className="font-mono text-xs font-semibold text-[#34d399] pt-2 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Paper <span>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* ── 8. Fullscreen Lightbox Modal (Exact Same Looking Card Just Expanded) ── */}
      {lightboxOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md px-4 pt-20 pb-8 sm:px-6 sm:pt-24 sm:pb-10 overflow-y-auto animate-fadeIn"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={post.title}
        >
          {/* Exact Same Looking Card Just Expanded */}
          <div
            className="relative w-auto max-w-[94vw] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl max-h-[calc(100dvh-6.5rem)] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#121513] border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_60px_rgba(16,185,129,0.25)] flex flex-col justify-end my-auto transition-all select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Single Unified Close Button — Pinned directly to the card's top-right corner */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#070a08]/85 hover:bg-rose-600 text-slate-200 hover:text-white border border-white/20 text-xs font-mono font-medium tracking-wider uppercase backdrop-blur-md shadow-2xl transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Close photo preview"
              title="Close (Esc)"
            >
              <span>Close</span>
              <span className="text-xs font-bold leading-none">✕</span>
            </button>

            {/* Photo Container with Same Gradient Overlay */}
            <div
              className="w-full overflow-hidden bg-neutral-950 relative flex items-center justify-center"
              style={{ maxHeight: 'calc(100dvh - 12rem)' }}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto max-h-[calc(100dvh-12rem)] object-contain filter contrast-[1.02] brightness-[0.98] select-none block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070a08]/85 via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* Bottom Figure Caption Bar — Matching Exact Hero Card */}
            <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 max-w-[80%]">
                <span className="font-mono text-[10px] sm:text-xs text-slate-200 bg-[#070a08]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 truncate shadow-lg">
                  {post.imageCaption || `FIGURE 1.0 — ${post.category.toUpperCase()} RESEARCH APPARATUS`}
                </span>
                <span className="hidden sm:inline-block font-mono text-[10px] text-[#34d399] bg-[#121513]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#34d399]/30">
                  Enlarged Figure View
                </span>
              </div>

              <span className="font-mono text-[10px] text-slate-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 hidden md:inline-block">
                Esc to close
              </span>
            </div>
          </div>
        </div>,
        document.body
      )}

    </main>
  )
}
