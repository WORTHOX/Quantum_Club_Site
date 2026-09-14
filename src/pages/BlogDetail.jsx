import { useEffect, useState, useMemo } from 'react'
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

  // Get article detail content from post object or fallback
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

  // ── States ──
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedCode, setCopiedCode] = useState(null)
  const [copiedCitation, setCopiedCitation] = useState(false)
  const [citationFormat, setCitationFormat] = useState('bibtex') // 'bibtex' | 'apa'
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Calculate estimated total words
  const wordCount = useMemo(() => {
    const text = [
      post.title,
      details.leadSummary,
      ...details.sections.map((s) => `${s.title} ${s.content} ${s.quote || ''}`)
    ].join(' ')
    return text.trim().split(/\s+/).length
  }, [post, details])

  // Scroll to top on post switch
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [post])

  // Guarantee clean body overflow behavior on mount and unmount
  useEffect(() => {
    if (!lightboxOpen) {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxOpen])

  // Lock scroll during lightbox only & handle Escape key
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
    }
  }, [lightboxOpen])

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

  // Related posts (excluding current post)
  const relatedPosts = useMemo(() => {
    return blogData.filter((p) => p.id !== post.id && p.slug !== post.slug).slice(0, 3)
  }, [post])

  return (
    <main className="bg-[#fcfcfd] dark:bg-[#070a08] min-h-screen text-slate-800 dark:text-slate-200 relative selection:bg-[#34d399]/30 selection:text-white pb-32 overflow-x-clip transition-colors duration-300">
      
      {/* ── Dotted Matrix Ambient Grid (Consistent with SQC Design System) ── */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] opacity-70 pointer-events-none z-0" 
        aria-hidden="true" 
      />

      {/* ── Soft Emerald Radial Glow Behind Hero ── */}
      <div 
        className="absolute top-28 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#10b981]/08 dark:from-[#10b981]/12 via-[#06b6d4]/05 to-transparent rounded-full blur-3xl pointer-events-none z-0" 
        aria-hidden="true"
      />

      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 pt-28 sm:pt-32">
        
        {/* ── Top Navigation & Back Pill ── */}
        <nav className="mb-10 flex flex-wrap items-center justify-between gap-4" aria-label="Breadcrumb">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 shadow-xs dark:bg-[#121513] dark:border-white/10 dark:text-slate-300 dark:hover:text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 backdrop-blur-md active:scale-95"
          >
            <svg 
              className="w-4 h-4 text-emerald-600 dark:text-[#34d399] group-hover:-translate-x-1 transition-transform duration-200" 
              viewBox="0 0 16 16" 
              fill="none" 
              aria-hidden="true" 
            >
              <path d="M12 8H4M4 8L8 12M4 8L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Back to Journal</span>
          </Link>

          <div className="hidden sm:flex items-center gap-3 font-mono text-xs font-bold text-emerald-700 dark:text-[#34d399] tracking-widest uppercase">
            <span>SYMBIOSIS QUANTUM CLUB</span>
            <span className="text-slate-300 dark:text-white/30">✦</span>
            <span>RESEARCH DISPATCHES 2026</span>
          </div>
        </nav>

        {/* ── Article Header (Confident Editorial Typography) ── */}
        <header className="max-w-4xl mx-auto mb-12 text-left">
          
          {/* Category & Metadata Pills */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider bg-[#10b981]/15 text-emerald-800 dark:text-[#34d399] border border-[#10b981]/35 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#34d399] animate-pulse" />
              {post.category}
            </span>
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-medium">
              {formatDate(post.date)}
            </span>
            <span className="text-slate-300 dark:text-white/20">•</span>
            <span className="font-mono text-xs text-emerald-700 dark:text-[#34d399] font-medium">
              {post.readTime}
            </span>
            <span className="text-slate-300 dark:text-white/20 hidden sm:inline">•</span>
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
              ~{wordCount} words
            </span>
          </div>

          {/* Article Title */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 dark:text-white tracking-tight leading-[1.14] mb-6">
            {post.title}
          </h1>

          {/* Lead Summary Deck */}
          <p className="font-body text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-light max-w-[68ch] border-l-2 border-emerald-500 dark:border-[#34d399] pl-5 py-0.5 mb-8 text-left">
            {details.leadSummary}
          </p>

          {/* Author Byline Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-white/[0.08]">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-full bg-slate-100 dark:bg-[#121513] border-2 border-emerald-500/40 dark:border-[#34d399]/40 overflow-hidden shadow-sm shrink-0 flex items-center justify-center text-emerald-700 dark:text-[#34d399] font-display font-bold text-base">
                {typeof post.author === 'object' && post.author.avatar ? (
                  <img src={post.author.avatar} alt={authorName} className="w-full h-full object-cover" />
                ) : (
                  authorName.charAt(0)
                )}
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#10b981] border-2 border-white dark:border-[#070a08]" title="Verified SQC Fellow" />
              </div>
              
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="font-display text-base font-bold text-slate-900 dark:text-white">
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
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                  {authorRole} <span className="text-slate-300 dark:text-white/20">•</span> {authorDepartment}
                </span>
              </div>
            </div>

            {/* Quick Share / Copy Action */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 shadow-xs dark:bg-white/[0.04] dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/[0.08] dark:hover:text-white font-mono text-xs transition-all duration-200 active:scale-95 cursor-pointer"
                title="Copy article URL"
              >
                <span>{copiedLink ? '✓ Copied Link' : 'Copy Link'}</span>
              </button>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 shadow-xs dark:bg-white/[0.04] dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/[0.08] dark:hover:text-white font-mono text-xs transition-all duration-200 active:scale-95"
                title="Share on LinkedIn"
              >
                <span>Share</span>
                <span className="text-emerald-600 dark:text-[#34d399] font-bold">↗</span>
              </a>
            </div>
          </div>
        </header>

        {/* ── Hero Image Showcase with Lightbox Inspection ── */}
        <div className="max-w-5xl mx-auto mb-14">
          <div 
            onClick={() => setLightboxOpen(true)}
            className="group relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#121513] border border-slate-200 dark:border-white/10 shadow-md dark:shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(16,185,129,0.08)] cursor-pointer transition-all duration-300 hover:border-emerald-500/50 dark:hover:border-[#34d399]/50"
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
              className="w-full h-full object-cover transition-transform duration-700 ease-out brightness-[0.98] contrast-[1.02] group-hover:scale-[1.02]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-[#070a08]/85 via-transparent to-black/20 pointer-events-none" />

            {/* Bottom Figure Caption */}
            <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none">
              <span className="font-mono text-[10px] sm:text-xs text-slate-800 dark:text-slate-300 bg-white/90 dark:bg-[#070a08]/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 truncate max-w-[80%] shadow-sm">
                {post.imageCaption || `FIGURE 1.0 — ${post.category.toUpperCase()} RESEARCH APPARATUS`}
              </span>

              {/* Click to expand badge */}
              <span className="font-mono text-[10px] sm:text-xs text-emerald-700 dark:text-[#34d399] bg-white/95 dark:bg-[#121513]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30 dark:border-[#34d399]/30 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity shadow-sm">
                <span>Expand</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* ── Main 2-Column Reading Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-14 max-w-5xl mx-auto items-start">
          
          {/* Left Main Article Stream (Comfortable 68ch Typography) */}
          <article className="flex flex-col gap-10 max-w-[70ch] w-full mx-auto lg:mx-0">
            
            {/* Executive Summary / Key Takeaways Box */}
            {details.takeaways && details.takeaways.length > 0 && (
              <section 
                aria-labelledby="takeaways-heading"
                className="relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#121513]/90 border border-emerald-300/60 dark:border-[#10b981]/30 shadow-sm dark:shadow-[0_12px_36px_rgba(0,0,0,0.5)] flex flex-col gap-4 overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-800 dark:text-[#34d399] uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-[#34d399] shadow-[0_0_8px_#34d399]" />
                    <h2 id="takeaways-heading" className="font-mono text-xs font-bold m-0 text-emerald-800 dark:text-[#34d399]">
                      EXECUTIVE RESEARCH BRIEFING
                    </h2>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase">
                    Key Findings
                  </span>
                </div>

                <ol className="flex flex-col gap-4 m-0 pl-0 list-none font-body text-[0.9375rem] sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {details.takeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3.5">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-800 dark:text-[#34d399] border border-emerald-500/30 shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <span className="text-slate-800 dark:text-slate-200">{item}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Article Sections Stream */}
            {details.sections && details.sections.map((sec, idx) => (
              <section 
                key={idx} 
                className="flex flex-col gap-5 pt-8 border-t border-slate-200 dark:border-white/[0.08] first:border-t-0 first:pt-0"
              >
                {/* Section Heading */}
                {sec.title && (
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug m-0">
                    {sec.title}
                  </h2>
                )}

                {/* Section Body Paragraphs */}
                {sec.content && (
                  <div className="font-body text-base sm:text-lg leading-[1.85] text-slate-700 dark:text-slate-300 space-y-5 whitespace-pre-line">
                    {sec.content}
                  </div>
                )}

                {/* Pullquote */}
                {sec.quote && (
                  <figure className="relative my-4 p-6 sm:p-7 rounded-2xl bg-slate-50/80 dark:bg-gradient-to-r dark:from-white/[0.04] dark:to-white/[0.01] border-l-4 border-emerald-500 border-y border-r border-slate-200/90 dark:border-white/10 shadow-xs dark:shadow-lg">
                    <blockquote className="m-0 font-display text-lg sm:text-xl font-medium italic text-slate-900 dark:text-slate-100 leading-relaxed">
                      &ldquo;{sec.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-3 font-mono text-xs text-emerald-700 dark:text-[#34d399] uppercase tracking-wider">
                      — Research Log Annotation // SQC
                    </figcaption>
                  </figure>
                )}

                {/* Code / Primary Benchmark Citation Box */}
                {sec.codeSnippet && (
                  <div className="mt-3 rounded-2xl bg-[#0d0f12] border border-white/12 shadow-xl overflow-hidden">
                    {/* Header Bar */}
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
            <div className="mt-4 p-6 rounded-2xl bg-white dark:bg-[#0e1210] border border-slate-200/90 dark:border-white/10 shadow-sm dark:shadow-lg flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200 dark:border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Cite This Article
                  </span>
                  <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.05] px-2 py-0.5 rounded">
                    Open Access
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-black/40 p-1 rounded-lg border border-slate-200 dark:border-white/10">
                  <button
                    onClick={() => setCitationFormat('bibtex')}
                    className={`font-mono text-[11px] px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      citationFormat === 'bibtex' 
                        ? 'bg-emerald-500/20 text-emerald-800 dark:text-[#34d399] font-bold' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    BibTeX
                  </button>
                  <button
                    onClick={() => setCitationFormat('apa')}
                    className={`font-mono text-[11px] px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      citationFormat === 'apa' 
                        ? 'bg-emerald-500/20 text-emerald-800 dark:text-[#34d399] font-bold' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    APA
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-black/50 rounded-xl p-3.5 border border-slate-200/90 dark:border-white/[0.06] font-mono text-xs text-slate-800 dark:text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto select-all">
                {citationTexts[citationFormat]}
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-500">
                  Licensed under Creative Commons BY-NC 4.0
                </span>
                <button
                  onClick={handleCopyCitation}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#10b981]/15 hover:bg-[#10b981]/30 text-emerald-800 dark:text-[#34d399] border border-[#10b981]/35 font-mono text-xs font-medium transition-all active:scale-95 cursor-pointer"
                >
                  {copiedCitation ? '✓ Citation Copied' : 'Copy Citation'}
                </button>
              </div>
            </div>

            {/* Tags & Topic Pills */}
            <div className="pt-6 border-t border-slate-200 dark:border-white/[0.08] flex flex-col gap-3">
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Related Topics & Research Tags
              </span>
              <div className="flex flex-wrap gap-2">
                {details.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 rounded-full font-mono text-xs bg-slate-50 dark:bg-[#121513] text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-white/10 hover:border-[#34d399]/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Profile Bio Box */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#121513]/90 border border-slate-200/90 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm dark:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#10b981]/20 to-transparent border border-[#10b981]/40 flex items-center justify-center font-display font-bold text-xl text-emerald-700 dark:text-[#34d399] overflow-hidden shrink-0">
                  {typeof post.author === 'object' && post.author.avatar ? (
                    <img src={post.author.avatar} alt={authorName} className="w-full h-full object-cover" />
                  ) : (
                    authorName.charAt(0)
                  )}
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-slate-900 dark:text-white text-base sm:text-lg">{authorName}</span>
                    <span className="font-mono text-[10px] text-emerald-800 dark:text-[#34d399] bg-[#34d399]/15 border border-[#34d399]/30 px-2 py-0.5 rounded-full uppercase">
                      Author
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    {authorRole} • Symbiosis Quantum Club
                  </span>
                  <span className="font-body text-xs text-slate-600 dark:text-slate-400">
                    Contributing research fellow at Symbiosis Institute of Technology (SIT), Pune.
                  </span>
                </div>
              </div>

              <a 
                href={authorLinkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/15 hover:bg-[#10b981] text-emerald-800 dark:text-[#34d399] hover:text-[#041f14] border border-[#10b981]/30 font-mono text-xs font-bold transition-all duration-200 active:scale-95 shrink-0"
              >
                <span>LinkedIn Profile</span>
                <span>↗</span>
              </a>
            </div>

          </article>

          {/* ── Right Sticky Sidebar (Clean & High-Utility, Zero Filler) ── */}
          <aside className="hidden lg:flex flex-col gap-6 sticky top-28">
            
            {/* Share & Quick Actions Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#121513]/90 border border-slate-200/90 dark:border-white/10 flex flex-col gap-4 backdrop-blur-xl shadow-sm dark:shadow-lg text-left">
              <h3 className="font-mono text-[11px] font-bold text-emerald-800 dark:text-[#34d399] uppercase tracking-wider border-b border-slate-200 dark:border-white/[0.08] pb-2.5 m-0">
                SHARE PUBLICATION
              </h3>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={handleCopyLink}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 hover:border-[#34d399]/40 text-slate-800 dark:text-slate-200 font-mono text-xs flex items-center justify-between transition-all duration-200 cursor-pointer active:scale-98"
                >
                  <span>{copiedLink ? '✓ Copied URL' : 'Copy Article Link'}</span>
                  <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-[#34d399]" viewBox="0 0 16 16" fill="none">
                    <path d="M6 10L10 6M7 4h5v5M9 12H4V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 hover:border-[#0a66c2]/50 text-slate-800 dark:text-slate-200 font-mono text-xs flex items-center justify-between transition-all duration-200"
                >
                  <span>Share on LinkedIn</span>
                  <span className="text-emerald-600 dark:text-[#34d399] font-mono">↗</span>
                </a>
              </div>
            </div>

            {/* Quick Citation Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#121513]/90 border border-slate-200/90 dark:border-white/10 flex flex-col gap-3.5 backdrop-blur-xl shadow-sm dark:shadow-lg text-left">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-2.5">
                <span className="font-mono text-[11px] font-bold text-emerald-800 dark:text-[#34d399] uppercase tracking-wider">
                  QUICK CITATION
                </span>
                <span className="font-mono text-[10px] text-slate-500">
                  BibTeX
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-black/40 rounded-xl border border-slate-200 dark:border-white/5 font-mono text-[11px] text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {citationTexts.bibtex}
              </div>

              <button
                onClick={handleCopyCitation}
                className="w-full py-2 px-3 rounded-xl bg-[#10b981]/15 hover:bg-[#10b981]/25 text-emerald-800 dark:text-[#34d399] border border-[#10b981]/30 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
              >
                <span>{copiedCitation ? '✓ Copied' : 'Copy BibTeX'}</span>
              </button>
            </div>

            {/* Publication Identity Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/90 via-white to-slate-50 dark:from-[#10b981]/10 dark:via-[#121513] dark:to-[#070a08] border border-emerald-300/40 dark:border-[#10b981]/25 flex flex-col gap-2.5 shadow-sm dark:shadow-md text-left">
              <span className="font-mono text-[10px] font-bold text-emerald-800 dark:text-[#34d399] uppercase tracking-widest">
                SYMBIOSIS QUANTUM DISPATCHES
              </span>
              <p className="font-body text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
                Official research dispatches authored by student researchers and mentors at Symbiosis Quantum Club, SIT Pune.
              </p>
              <div className="pt-2 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between font-mono text-[10px] text-slate-500">
                <span>OPEN ACCESS</span>
                <span>VOL. 2026</span>
              </div>
            </div>

          </aside>

        </div>

        {/* ── Related Articles Recommendation ── */}
        {relatedPosts.length > 0 && (
          <section className="mt-28 pt-16 border-t border-slate-200 dark:border-white/10 flex flex-col gap-10 max-w-5xl mx-auto text-left">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-[#34d399] font-semibold block mb-1">
                  CONTINUE EXPLORING
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight m-0">
                  More Research From Quantum Journal
                </h2>
              </div>
              
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 font-mono text-xs font-bold text-emerald-700 dark:text-[#34d399] hover:underline"
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
                  className="group flex flex-col bg-white dark:bg-[#121215] border border-slate-200/90 dark:border-white/10 rounded-2xl overflow-hidden hover:border-[#34d399]/50 shadow-sm hover:shadow-md dark:shadow-none hover:shadow-[0_16px_36px_rgba(16,185,129,0.15)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-full aspect-[16/10] overflow-hidden relative bg-slate-100 dark:bg-[#070a08]">
                    <img 
                      src={relPost.image} 
                      alt={relPost.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-[#121215] via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-[#070a08]/80 text-emerald-800 dark:text-[#34d399] border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm">
                      {relPost.category}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col gap-2.5 flex-1 justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        <span>{formatDate(relPost.date)}</span>
                        <span>{relPost.readTime}</span>
                      </div>
                      <h3 className="font-display text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-[#34d399] transition-colors leading-snug m-0 line-clamp-2">
                        {relPost.title}
                      </h3>
                      <p className="font-body text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed m-0">
                        {relPost.excerpt}
                      </p>
                    </div>

                    <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-[#34d399] pt-2 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Paper <span>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* ── Fullscreen Lightbox Modal (Exact Same Looking Card Just Expanded) ── */}
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
