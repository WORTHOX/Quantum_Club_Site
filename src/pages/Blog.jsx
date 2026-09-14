import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import useSEO from '../utils/useSEO'
import blogData from '../data/blog.json'
import WhatsappIcon from '../components/ui/WhatsappIcon'

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('')

  useSEO({
    title: 'Quantum Insights & Research Blog — Symbiosis Quantum Club',
    description: 'Read quantum computing insights, research breakdowns, and technical deep-dives from the Symbiosis Quantum Club team at SIT Pune.',
    canonical: '/blog',
    keywords: 'quantum computing blog, Qiskit tutorials, quantum research, SIT Pune articles',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Quantum Insights & Research Blog',
      url: 'https://symbiosisquantumclub.vercel.app/blog',
      description: 'Quantum computing insights and research articles by Symbiosis Quantum Club.',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Symbiosis Quantum Club',
        url: 'https://symbiosisquantumclub.vercel.app/'
      }
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Memoized search filtering for zero-latency UI performance
  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return blogData
    return blogData.filter((post) => {
      const authorName = typeof post.author === 'object' ? post.author.name : post.author
      return (
        post.title?.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.category?.toLowerCase().includes(query) ||
        authorName?.toLowerCase().includes(query)
      )
    })
  }, [searchQuery])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
    const year = date.getFullYear()
    return `${month}, ${year}`
  }


  return (
    <main className="bg-[#fcfcfd] dark:bg-[#070a08] min-h-screen pt-28 pb-24 text-slate-800 dark:text-slate-200 relative overflow-x-clip transition-colors duration-300">
      {/* ── Dotted Background Grid ── */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none z-0" 
        aria-hidden="true" 
      />

      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Redefined Grid Container Tracks: 520px Left Editorial Sidebar, 1fr Right Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-8 lg:gap-12 items-start">
          
          {/* ── Left Sticky Editorial Sidebar (Balanced Alignment) ── */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-[145px] lg:self-start lg:h-fit lg:z-10 pt-6 lg:pt-10">
            {/* Header Lockup: Line Accent + Monospace Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.675rem] font-bold tracking-widest text-emerald-700 dark:text-[#34d399] uppercase">
                SYMBIOSIS QUANTUM CLUB ✦ JOURNAL 2026
              </span>
            </div>

            {/* Main High-Impact Headline Stack */}
            <h1 className="font-display text-[clamp(2.4rem,4.2vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight uppercase text-slate-900 dark:text-white m-0 flex flex-col">
              <span>PIONEERING THE</span>
              <span>FRONTIER OF</span>
              <span className="bg-gradient-to-r from-slate-900 via-emerald-600 to-teal-700 dark:from-white dark:via-[#34d399] dark:to-[#10b981] bg-clip-text text-transparent">
                QUANTUM INSIGHTS
              </span>
            </h1>

            {/* Subtitle Paragraph (Expanded to Fill Empty Visual Area) */}
            <p className="font-body text-base sm:text-lg text-slate-600 dark:text-gray-300 max-w-[48ch] leading-relaxed m-0">
              Discover student research papers, algorithm deep-dives, quantum analysis, and flagship event recaps authored by members and mentors at Symbiosis Quantum Club.
            </p>
          </aside>

          {/* ── Right Article Feed Stream (Moved Adjacent to Left Block & Image) ── */}
          <section className="flex flex-col w-full">
            {/* Search Bar Header */}
            <div className="flex items-center pb-6 mb-6 border-b border-emerald-500/20">
              <div className="relative w-full">
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-[#34d399] pointer-events-none" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                
                <input 
                  type="text" 
                  placeholder="Search quantum articles, topics, authors..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3.5 pl-12 pr-11 bg-white dark:bg-[#121513]/85 border border-slate-300 dark:border-[#10b981]/25 rounded-full font-body text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-emerald-500 dark:focus:border-[#34d399] focus:shadow-[0_0_24px_rgba(16,185,129,0.25)] shadow-sm"
                />

                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 dark:text-slate-500 dark:hover:text-[#34d399] transition-colors p-1 flex items-center justify-center text-xs"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Article Feed List */}
            {filteredPosts.length > 0 ? (
              <div className="flex flex-col">
                {filteredPosts.map((post) => (
                  <Link 
                    key={post.id} 
                    to={`/blog/${post.id}`}
                    className="group grid grid-cols-1 sm:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-7 lg:gap-9 py-9 border-t border-slate-200 dark:border-white/10 first:border-t-0 first:pt-0 hover:border-[#10b981]/50 transition-colors duration-300 relative block text-left"
                  >
                    {/* 3:4 Portrait Image Frame */}
                    <div className="w-full aspect-[3/4] rounded-xl overflow-hidden relative bg-white dark:bg-[#121513] border border-slate-200/90 dark:border-white/10 shadow-sm dark:shadow-lg group-hover:border-[#10b981]/50 group-hover:shadow-[0_12px_32px_rgba(16,185,129,0.18)] transition-all duration-300">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-all duration-500 ease-out brightness-95 dark:brightness-90 contrast-[1.02] dark:contrast-[1.05] group-hover:scale-[1.07] group-hover:brightness-100 group-hover:contrast-[1.1] transform-gpu" 
                        loading="lazy" 
                        decoding="async"
                      />
                    </div>

                    {/* Right Content Meta & Excerpt */}
                    <div className="flex flex-col gap-3.5">
                      <div className="flex items-center gap-4">
                        <time className="font-mono text-xs font-semibold text-emerald-700 dark:text-[#34d399] tracking-wider uppercase" dateTime={post.date}>
                          {formatDate(post.date)}
                        </time>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[0.675rem] font-bold tracking-wider uppercase bg-[#10b981]/12 text-emerald-800 dark:text-[#34d399] border border-[#10b981]/30">
                          {post.category}
                        </span>
                      </div>

                      <h2 className="font-display text-[clamp(1.25rem,2.2vw,1.65rem)] font-bold text-slate-900 dark:text-white leading-snug m-0 group-hover:text-emerald-700 dark:group-hover:text-[#34d399] transition-colors duration-200">
                        {post.title}
                      </h2>

                      <div>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 shadow-xs dark:bg-[#121513] dark:border-[#10b981]/30 dark:text-white font-display text-xs font-semibold tracking-wide transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-[#10b981] group-hover:to-[#059669] group-hover:border-[#34d399] group-hover:text-[#041f14] group-hover:shadow-[0_4px_18px_rgba(16,185,129,0.3)] cursor-pointer">
                          Discover
                          <svg 
                            className="w-3.5 h-3.5 text-emerald-600 dark:text-[#34d399] group-hover:text-[#041f14] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" 
                            viewBox="0 0 16 16" 
                            fill="none" 
                            aria-hidden="true" 
                          >
                            <path 
                              d="M4 12L12 4H6M12 4V10" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                            />
                          </svg>
                        </span>
                      </div>

                      <p className="font-body text-[0.925rem] text-slate-600 dark:text-slate-400 leading-relaxed m-0 max-w-[60ch]">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-5 pt-1 font-mono text-[0.725rem] text-slate-500">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">By {typeof post.author === 'object' ? post.author.name : post.author}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-16 px-8 text-center flex flex-col items-center gap-5 text-slate-500 dark:text-slate-400 font-body">
                <p>No publications found matching &ldquo;{searchQuery}&rdquo;</p>
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-display text-xs font-bold transition-transform hover:scale-105 shadow-sm"
                >
                  Reset Search
                </button>
              </div>
            )}
          </section>

        </div>

        {/* ── Bottom CTA: Stay Connected (Apple Design) ── */}
        <section className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-emerald-50/80 via-white/90 to-slate-50/90 dark:from-[#10b981]/10 dark:via-[#121513]/90 dark:to-[#070a08] border border-emerald-300/40 dark:border-[#10b981]/25 shadow-xl dark:shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-slate-300/40 dark:before:via-white/20 before:to-transparent">
          <div>
            <p className="font-pixel text-[11px] font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase mb-3">
              Stay Connected
            </p>
            <h2 className="font-display text-[clamp(1.65rem,3vw,2.5rem)] font-extrabold text-slate-900 dark:text-white tracking-tight m-0 leading-tight">
              Follow SQC for the latest{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-[#34d399] dark:to-[#10b981] bg-clip-text text-transparent">
                quantum research
              </span>
            </h2>
            <p className="font-body text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2.5 max-w-[46ch] leading-relaxed">
              Get new publications, event updates, and quantum computing insights delivered to your feed.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0">
            {/* WhatsApp — outline green, fill on hover */}
            <a
              href="https://chat.whatsapp.com/JIujrGfVOwJD9z0fhsTIIa"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-5 h-11 rounded-full bg-transparent border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-[#061a0d] font-mono text-xs font-bold uppercase tracking-wider hover:shadow-[0_6px_24px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
            >
              <WhatsappIcon size={16} strokeWidth={2} className="w-4 h-4 shrink-0" />
              WhatsApp
            </a>
            {/* GitHub — outline white/gray, fill dark on hover */}
            <a
              href="https://github.com/Symbiosis-Quantum-Club"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-5 h-11 rounded-full bg-transparent border border-slate-400 dark:border-white/40 text-slate-800 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-[#0d1117] font-mono text-xs font-bold uppercase tracking-wider hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_6px_24px_rgba(255,255,255,0.18)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
            {/* LinkedIn — outline blue, fill on hover */}
            <a
              href="https://www.linkedin.com/company/symbiosis-quantum-club/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-5 h-11 rounded-full bg-transparent border border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white font-mono text-xs font-bold uppercase tracking-wider hover:shadow-[0_6px_24px_rgba(10,102,194,0.5)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
            {/* Instagram — outline purple/pink gradient, fill gradient on hover */}
            <a
              href="https://www.instagram.com/quantumclub.sit/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-5 h-11 rounded-full bg-transparent border border-[#e1306c] text-[#e1306c] hover:bg-gradient-to-tr hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:border-transparent hover:text-white font-mono text-xs font-bold uppercase tracking-wider hover:shadow-[0_6px_24px_rgba(225,48,108,0.5)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              Instagram
            </a>
          </div>
        </section>

      </div>
    </main>
  )
}
