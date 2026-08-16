import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import blogData from '../data/blog.json'

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    document.title = 'Quantum Insights — Symbiosis Quantum Club'
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

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setSubscribed(true)
      setEmailInput('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <main className="bg-[#070a08] min-h-screen pt-28 pb-24 text-slate-200 relative overflow-x-clip">
      {/* ── Dotted Background Grid ── */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none z-0" 
        aria-hidden="true" 
      />

      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Redefined Grid Container Tracks: 520px Left Editorial Sidebar, 1fr Right Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-8 lg:gap-12 items-start">
          
          {/* ── Left Sticky Editorial Sidebar (Balanced Alignment) ── */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-[145px] lg:self-start lg:h-fit lg:z-10 pt-6 lg:pt-10">
            {/* Header Lockup: Line Accent + Monospace Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-gradient-to-r from-[#34d399] to-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
              <span className="font-mono text-[0.675rem] font-bold tracking-widest text-[#34d399] uppercase">
                SYMBIOSIS QUANTUM CLUB ✦ JOURNAL 2026
              </span>
            </div>

            {/* Main High-Impact Headline Stack */}
            <h1 className="font-display text-[clamp(2.4rem,4.2vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight uppercase text-white m-0 flex flex-col">
              <span>PIONEERING THE</span>
              <span>FRONTIER OF</span>
              <span className="bg-gradient-to-r from-white via-[#34d399] to-[#10b981] bg-clip-text text-transparent">
                QUANTUM INSIGHTS
              </span>
            </h1>

            {/* Subtitle Paragraph (Expanded to Fill Empty Visual Area) */}
            <p className="font-body text-base sm:text-lg text-gray-300 max-w-[48ch] leading-relaxed m-0">
              Discover peer-reviewed papers, hardware breakthroughs, quantum algorithm deep-dives, and flagship event recaps engineered by student researchers and industry mentors at Symbiosis Quantum Club.
            </p>
          </aside>

          {/* ── Right Article Feed Stream (Moved Adjacent to Left Block & Image) ── */}
          <section className="flex flex-col w-full">
            {/* Search Bar Header */}
            <div className="flex items-center pb-6 mb-6 border-b border-[#10b981]/20">
              <div className="relative w-full">
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#34d399] pointer-events-none" 
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
                  className="w-full py-3.5 pl-12 pr-11 bg-[#121513]/85 border border-[#10b981]/25 rounded-full font-body text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-[#34d399] focus:bg-[#121513]/95 focus:shadow-[0_0_24px_rgba(16,185,129,0.25)]"
                />

                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#34d399] transition-colors p-1 flex items-center justify-center text-xs"
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
                    className="group grid grid-cols-1 sm:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-7 lg:gap-9 py-9 border-t border-white/10 first:border-t-0 first:pt-0 hover:border-[#10b981]/40 transition-colors duration-300 relative block text-left"
                  >
                    {/* 3:4 Portrait Image Frame */}
                    <div className="w-full aspect-[3/4] rounded-xl overflow-hidden relative bg-[#121513] border border-white/10 shadow-lg group-hover:border-[#10b981]/40 group-hover:shadow-[0_12px_32px_rgba(16,185,129,0.18)] transition-all duration-300">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-all duration-500 ease-out brightness-90 contrast-[1.05] group-hover:scale-[1.07] group-hover:brightness-100 group-hover:contrast-[1.1] transform-gpu" 
                        loading="lazy" 
                        decoding="async"
                      />
                    </div>

                    {/* Right Content Meta & Excerpt */}
                    <div className="flex flex-col gap-3.5">
                      <div className="flex items-center gap-4">
                        <time className="font-mono text-xs font-semibold text-[#34d399] tracking-wider uppercase" dateTime={post.date}>
                          {formatDate(post.date)}
                        </time>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[0.675rem] font-bold tracking-wider uppercase bg-[#10b981]/12 text-[#34d399] border border-[#10b981]/30">
                          {post.category}
                        </span>
                      </div>

                      <h2 className="font-display text-[clamp(1.25rem,2.2vw,1.65rem)] font-bold text-white leading-snug m-0 group-hover:text-[#34d399] transition-colors duration-200">
                        {post.title}
                      </h2>

                      <div>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#121513] border border-[#10b981]/30 text-white font-display text-xs font-semibold tracking-wide transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-[#10b981] group-hover:to-[#059669] group-hover:border-[#34d399] group-hover:text-[#041f14] group-hover:shadow-[0_4px_18px_rgba(16,185,129,0.3)] cursor-pointer">
                          Discover
                          <svg 
                            className="w-3.5 h-3.5 text-[#34d399] group-hover:text-[#041f14] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" 
                            viewBox="0 0 16 16" 
                            fill="none" 
                            aria-hidden="true"
                          >
                            <path 
                              d="M4 12L12 4M12 4H6M12 4V10" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                            />
                          </svg>
                        </span>
                      </div>

                      <p className="font-body text-[0.925rem] text-slate-400 leading-relaxed m-0 max-w-[60ch]">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-5 pt-1 font-mono text-[0.725rem] text-slate-500">
                        <span className="text-slate-400">By {typeof post.author === 'object' ? post.author.name : post.author}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-16 px-8 text-center flex flex-col items-center gap-5 text-slate-400 font-body">
                <p>No publications found matching &ldquo;{searchQuery}&rdquo;</p>
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#10b981] to-[#059669] text-[#041f14] font-display text-xs font-bold transition-transform hover:scale-105"
                >
                  Reset Search
                </button>
              </div>
            )}
          </section>

        </div>

        {/* ── Bottom Editorial Newsletter CTA Section ── */}
        <section className="mt-24 p-8 sm:p-12 lg:p-16 rounded-2xl bg-gradient-to-br from-[#10b981]/10 via-[#121513]/80 to-[#070a08] border border-[#10b981]/25 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center relative overflow-hidden shadow-2xl">
          <h2 className="font-display text-[clamp(1.8rem,3.2vw,2.75rem)] font-bold leading-tight text-white m-0 tracking-tight">
            We shape quantum <span className="bg-gradient-to-r from-[#34d399] to-[#10b981] bg-clip-text text-transparent">innovation</span>, collaboration, and <span className="bg-gradient-to-r from-[#34d399] to-[#10b981] bg-clip-text text-transparent">execution</span>.
          </h2>

          <div className="flex flex-col gap-4">
            <h3 className="font-display text-lg font-semibold text-white m-0">
              Subscribe to the Quantum Dispatch
            </h3>
            
            <form onSubmit={handleSubscribe} className="flex items-center relative w-full">
              <input 
                type="email" 
                placeholder="Enter your email address..." 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full py-3.5 pl-5 pr-14 bg-[#090d0a]/80 border border-[#10b981]/30 rounded-full font-body text-sm text-white outline-none transition-all duration-200 focus:border-[#34d399] focus:shadow-[0_0_20px_rgba(16,185,129,0.25)] placeholder:text-slate-500"
                required 
              />
              <button 
                type="submit" 
                className="absolute right-1.5 w-10 h-10 rounded-full bg-gradient-to-r from-[#10b981] to-[#059669] text-[#041f14] flex items-center justify-center hover:scale-105 hover:shadow-[0_4px_16px_rgba(16,185,129,0.4)] transition-all duration-200" 
                aria-label="Subscribe"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            {subscribed ? (
              <p className="font-mono text-xs text-[#34d399] m-0">
                ✓ Subscribed! You will receive our latest quantum insights.
              </p>
            ) : (
              <p className="font-mono text-xs text-slate-500 m-0">
                By subscribing you agree to receive monthly Symbiosis Quantum Club updates.
              </p>
            )}
          </div>
        </section>

      </div>
    </main>
  )
}
