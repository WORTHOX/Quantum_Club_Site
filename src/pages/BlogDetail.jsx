import { useEffect, useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import blogData from '../data/blog.json'

export default function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  // Find post matching URL parameter (id or slug)
  const post = useMemo(() => {
    return blogData.find((p) => p.id === id || p.slug === id) || blogData[0]
  }, [id])

  // Get deep article detail content from post object or fallback
  const details = useMemo(() => {
    return {
      leadSummary: post.leadSummary || post.excerpt,
      takeaways: post.takeaways || [
        'In-depth analysis by Symbiosis Quantum Club research fellows.',
        'Open-source code and cloud quantum benchmark demonstrations.',
        'Peer-reviewed insight published under Quantum Insights 2026.'
      ],
      sections: post.sections || [
        {
          title: '1. Overview & Research Context',
          content: post.excerpt,
          quote: 'Pioneering quantum innovation requires open collaboration across research, software, and hardware disciplines.'
        }
      ],
      tags: post.tags || [`#${post.category.replace(/\s+/g, '')}`, '#SymbiosisQuantum', '#Research']
    }
  }, [post])

  useEffect(() => {
    document.title = `${post.title} — Symbiosis Quantum Club`
    window.scrollTo(0, 0)
  }, [post])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 3500)
  }

  // Related posts (excluding current post)
  const relatedPosts = useMemo(() => {
    return blogData.filter((p) => p.id !== post.id && p.slug !== post.slug).slice(0, 3)
  }, [post])

  const authorName = typeof post.author === 'object' ? post.author.name : post.author
  const authorRole = typeof post.author === 'object' ? post.author.role : post.authorRole || 'Quantum Research Fellow'
  const authorLinkedin = typeof post.author === 'object' ? post.author.linkedin : `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(authorName + ' Symbiosis Quantum Club')}`

  return (
    <main className="bg-[#070a08] min-h-screen pt-28 pb-28 text-slate-200 relative overflow-x-clip">
      {/* ── Dotted Background Grid ── */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none z-0" 
        aria-hidden="true" 
      />

      <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* ── Top Navigation / Back Button Lockup ── */}
        <div className="mb-10 flex items-center justify-between">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#121513] border border-white/10 text-slate-300 font-mono text-xs font-semibold uppercase tracking-wider hover:border-[#10b981]/40 hover:text-white transition-all duration-300 shadow-md"
          >
            <svg 
              className="w-4 h-4 text-[#34d399] group-hover:-translate-x-1 transition-transform duration-300" 
              viewBox="0 0 16 16" 
              fill="none" 
              aria-hidden="true"
            >
              <path d="M12 8H4M4 8L8 12M4 8L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Back to Journal</span>
          </Link>

          <div className="hidden sm:flex items-center gap-3 font-mono text-[0.675rem] font-bold text-[#34d399] tracking-widest uppercase">
            <span>SYMBIOSIS QUANTUM CLUB</span>
            <span>✦</span>
            <span>PUBLICATIONS 2026</span>
          </div>
        </div>

        {/* ── Header Article Title Stack & Meta ── */}
        <header className="flex flex-col gap-6 max-w-4xl mb-12">
          {/* Eyebrow & Badges */}
          <div className="flex flex-wrap items-center gap-3.5">
            <span className="inline-flex items-center px-3 py-1 rounded-full font-mono text-xs font-bold tracking-wider uppercase bg-[#10b981]/15 text-[#34d399] border border-[#10b981]/35 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
              {post.category}
            </span>
            <span className="font-mono text-xs font-semibold text-slate-400 tracking-wider uppercase">
              {formatDate(post.date)}
            </span>
            <span className="text-slate-600">•</span>
            <span className="font-mono text-xs font-semibold text-[#34d399] tracking-wider uppercase">
              {post.readTime}
            </span>
          </div>

          {/* Main Article Title */}
          <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.75rem)] font-extrabold text-white leading-[1.08] tracking-tight uppercase m-0">
            {post.title}
          </h1>

          {/* Lead Summary */}
          <p className="font-body text-lg sm:text-xl text-slate-300 leading-relaxed font-light m-0 border-l-2 border-[#34d399] pl-5">
            {details.leadSummary}
          </p>

          {/* Author Card Lockup */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-2">
            <div className="w-12 h-12 rounded-full bg-[#121513] border border-[#10b981]/40 overflow-hidden shadow-lg flex items-center justify-center text-[#34d399] font-display font-bold text-lg">
              {typeof post.author === 'object' && post.author.avatar ? (
                <img src={post.author.avatar} alt={authorName} className="w-full h-full object-cover" />
              ) : (
                authorName.charAt(0)
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm sm:text-base font-semibold text-white">
                {authorName}
              </span>
              <span className="font-mono text-xs text-slate-400">
                {authorRole} • Symbiosis Quantum Club
              </span>
            </div>
          </div>
        </header>

        {/* ── Hero Image Showcase Frame ── */}
        <div className="w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden relative bg-[#121513] border border-[#10b981]/25 shadow-[0_16px_48px_rgba(16,185,129,0.12)] mb-14 group">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out brightness-95 contrast-[1.05] group-hover:scale-[1.03]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070a08]/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 right-5 font-mono text-[0.675rem] text-slate-300 bg-[#070a08]/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            FIGURE 1.0 — {post.category.toUpperCase()} BENCHMARK SUITE
          </div>
        </div>

        {/* ── Main Reading Content Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
          
          {/* Left Main Article Stream */}
          <article className="flex flex-col gap-10 max-w-[780px]">
            
            {/* Key Takeaways Box */}
            {details.takeaways && details.takeaways.length > 0 && (
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#10b981]/12 via-[#121513]/90 to-[#070a08] border border-[#10b981]/30 shadow-xl flex flex-col gap-4">
                <div className="flex items-center gap-2.5 font-mono text-xs font-bold text-[#34d399] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#34d399] shadow-[0_0_8px_#34d399]" />
                  <span>KEY RESEARCH TAKEAWAYS</span>
                </div>
                <ul className="flex flex-col gap-3 m-0 pl-0 list-none font-body text-sm sm:text-base text-slate-300 leading-relaxed">
                  {details.takeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[#34d399] font-bold text-sm mt-0.5">➔</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Sections Loop */}
            {details.sections && details.sections.map((sec, idx) => (
              <section key={idx} className="flex flex-col gap-5 pt-4 border-t border-white/10 first:border-t-0 first:pt-0">
                {sec.title && (
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug m-0 flex items-center gap-3">
                    <span>{sec.title}</span>
                  </h2>
                )}

                {sec.content && (
                  <div className="font-body text-base sm:text-lg text-slate-300 leading-relaxed space-y-4 whitespace-pre-line">
                    {sec.content}
                  </div>
                )}

                {sec.quote && (
                  <blockquote className="m-0 border-l-4 border-[#34d399] pl-6 py-4 my-4 bg-gradient-to-r from-white/[0.03] to-transparent rounded-r-xl font-display text-base sm:text-lg italic text-white leading-relaxed">
                    &ldquo;{sec.quote}&rdquo;
                  </blockquote>
                )}

                {sec.codeSnippet && (
                  <div className="mt-2 rounded-xl bg-[#121513] border border-white/10 p-5 font-mono text-xs sm:text-sm text-[#34d399] overflow-x-auto shadow-inner">
                    <pre className="m-0 leading-relaxed"><code>{sec.codeSnippet}</code></pre>
                  </div>
                )}
              </section>
            ))}

            {/* Article Footer Tags & Author Card */}
            <div className="pt-8 border-t border-white/10 flex flex-col gap-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {details.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full font-mono text-xs bg-[#121513] text-slate-400 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author Bio Box */}
              <div className="p-6 rounded-2xl bg-[#121513]/90 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#10b981]/20 to-transparent border border-[#10b981]/40 flex items-center justify-center font-display font-bold text-xl text-[#34d399] overflow-hidden">
                    {typeof post.author === 'object' && post.author.avatar ? (
                      <img src={post.author.avatar} alt={authorName} className="w-full h-full object-cover" />
                    ) : (
                      authorName.charAt(0)
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-display font-bold text-white text-base">{authorName}</span>
                    <span className="font-mono text-xs text-[#34d399]">{authorRole}</span>
                    <span className="font-body text-xs text-slate-400">Symbiosis Quantum Club Research Department</span>
                  </div>
                </div>

                <a 
                  href={authorLinkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#10b981]/15 text-[#34d399] border border-[#10b981]/30 font-mono text-xs font-bold hover:bg-[#10b981] hover:text-[#041f14] transition-all duration-200"
                >
                  Connect on LinkedIn ➔
                </a>
              </div>
            </div>

          </article>

          {/* Right Sticky Sidebar Tools */}
          <aside className="flex flex-col gap-8 lg:sticky lg:top-[110px]">
            {/* Share & Actions Card */}
            <div className="p-6 rounded-2xl bg-[#121513]/90 border border-white/10 flex flex-col gap-5 shadow-lg">
              <h3 className="font-mono text-xs font-bold text-[#34d399] tracking-wider uppercase m-0">
                SHARE THIS PUBLICATION
              </h3>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={handleCopyLink}
                  className="w-full py-3 px-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#10b981]/40 text-slate-200 font-display text-xs font-semibold flex items-center justify-between transition-all duration-200 cursor-pointer"
                >
                  <span>{copied ? '✓ Link Copied to Clipboard!' : 'Copy Article Link'}</span>
                  <svg className="w-4 h-4 text-[#34d399]" viewBox="0 0 16 16" fill="none">
                    <path d="M6 10L10 6M7 4h5v5M9 12H4V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#10b981]/40 text-slate-200 font-display text-xs font-semibold flex items-center justify-between transition-all duration-200"
                >
                  <span>Share on LinkedIn</span>
                  <span className="text-[#34d399] font-mono font-bold">➔</span>
                </a>
              </div>
            </div>

            {/* Publication Info Widget */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#10b981]/10 to-[#121513] border border-[#10b981]/25 flex flex-col gap-3">
              <span className="font-mono text-[0.675rem] font-bold text-[#34d399] uppercase tracking-widest">
                SQC JOURNAL ✦ 2026 EDITION
              </span>
              <p className="font-body text-xs text-slate-400 leading-relaxed m-0">
                Published by Symbiosis Quantum Club under Open Access guidelines. All code snippets and circuit files are licensed under Apache 2.0.
              </p>
            </div>
          </aside>

        </div>

        {/* ── Related Articles Recommendation Section ── */}
        <section className="mt-28 pt-16 border-t border-white/10 flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-gradient-to-r from-[#34d399] to-[#10b981]" />
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase m-0">
                MORE DISPATCHES FROM QUANTUM JOURNAL
              </h2>
            </div>
            
            <Link 
              to="/blog" 
              className="hidden sm:inline-flex items-center gap-2 text-xs font-mono font-bold text-[#34d399] hover:underline"
            >
              <span>VIEW ALL PAPERS</span>
              <span>➔</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relPost) => (
              <Link 
                key={relPost.id} 
                to={`/blog/${relPost.id}`}
                className="group flex flex-col bg-[#121513] border border-white/10 rounded-2xl overflow-hidden hover:border-[#10b981]/50 hover:shadow-[0_12px_32px_rgba(16,185,129,0.18)] transition-all duration-300"
              >
                <div className="w-full aspect-[16/10] overflow-hidden relative bg-[#070a08]">
                  <img 
                    src={relPost.image} 
                    alt={relPost.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#34d399] font-semibold">{formatDate(relPost.date)}</span>
                    <span className="text-slate-400">{relPost.readTime}</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-white group-hover:text-[#34d399] transition-colors leading-snug m-0">
                    {relPost.title}
                  </h3>
                  <p className="font-body text-xs text-slate-400 line-clamp-2 leading-relaxed m-0">
                    {relPost.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
