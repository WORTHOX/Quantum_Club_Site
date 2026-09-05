import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import events, { CATEGORY_COLORS } from '../data/events'

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [lightboxImg, setLightboxImg] = useState(null)

  useEffect(() => {
    if (id === 'qiskit-fall-fest-2025') {
      navigate('/fallfest', { replace: true })
      return
    }
    const found = events.find(e => e.id === id)
    if (found) {
      setEvent(found)
      document.title = `${found.title} — Symbiosis Quantum Club Events`
      window.scrollTo(0, 0)
    } else {
      setEvent(null)
    }
  }, [id, navigate])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && lightboxImg !== null) setLightboxImg(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxImg])

  if (event === null) {
    return (
      <main className="min-h-dvh flex items-center justify-center bg-[#070a08] p-6 text-center">
        <div className="max-w-md flex flex-col items-center gap-4">
          <span className="font-mono text-7xl font-bold text-gray-700">404</span>
          <h1 className="text-3xl font-bold text-white">Event Not Found</h1>
          <p className="text-gray-400 text-sm">The event you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/events')}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors"
          >
            Back to Events
          </button>
        </div>
      </main>
    )
  }

  const colorScheme = CATEGORY_COLORS[event.category] || {
    bg: 'bg-emerald-500/12', text: 'text-emerald-400', border: 'border-emerald-500/30',
  }

  const relatedEvents = events
    .filter(e => e.category === event.category && e.id !== event.id)
    .slice(0, 3)

  const hasGallery = event.gallery && event.gallery.length > 0

  return (
    <main className="bg-[#070a08] min-h-dvh pt-[calc(72px+clamp(2rem,1.25rem+3.75vw,5rem))] pb-20 text-slate-200">
      <article>

        {/* ── Header ── */}
        <header className="px-4 pb-10 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">

            {/* Meta row: category · date · location */}
            <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1.5 font-mono text-xs uppercase tracking-wider">
              <span className={`px-3 py-1 rounded-full border font-semibold ${colorScheme.bg} ${colorScheme.text} ${colorScheme.border}`}>
                {event.category}
              </span>
              <span className="text-slate-400">{event.dateDisplay || event.date}</span>
              {event.location && (
                <span className="text-slate-400 pl-3 border-l border-slate-800">{event.location}</span>
              )}
              {event.status === 'upcoming' && (
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold animate-pulse">
                  Upcoming
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl font-bold font-display text-white tracking-tight mt-1 mb-1">
              {event.title}
            </h1>
            {event.subtitle && (
              <p className="font-mono text-sm text-slate-400 uppercase tracking-widest">{event.subtitle}</p>
            )}

            {/* Quick stats */}
            {(event.participants || event.duration || event.sessions) && (
              <div className="flex flex-wrap items-center justify-center gap-4 mt-2 font-mono text-xs text-slate-400">
                {event.participants && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.participants}
                  </span>
                )}
                {event.duration && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.duration}
                  </span>
                )}
                {event.sessions && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {event.sessions}
                  </span>
                )}
              </div>
            )}

            {/* Registration button or Application Alert */}
            {event.status === 'upcoming' && (
              <div className="mt-3">
                {event.registrationUrl ? (
                  <a
                    href={event.registrationUrl}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-emerald-500/25"
                  >
                    Register Now →
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold uppercase tracking-wider shadow-lg shadow-amber-500/10">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    {event.applicationAlert || 'Applications Opening Soon'}
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* ── Cover Image ── */}
        {event.coverImage && (
          <div className="px-4 max-w-5xl mx-auto mb-14">
            <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden bg-[#0a0f14] border border-cyan-900/30 shadow-2xl">
              <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* ── Description ── */}
        <div className="px-4 max-w-3xl mx-auto mb-14">
          {Array.isArray(event.description) && event.description.length > 0 ? (
            <div className="flex flex-col gap-5">
              {event.description.map((para, i) => (
                <p key={i} className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          ) : event.description ? (
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">{event.description}</p>
          ) : (
            <div className="text-center py-12 border-y border-slate-800">
              <p className="font-mono text-xs text-slate-500 uppercase tracking-widest">Detailed recap coming soon.</p>
            </div>
          )}
        </div>

        {/* ── Tags ── */}
        {event.tags && event.tags.length > 0 && (
          <div className="px-4 max-w-3xl mx-auto mb-16 flex flex-wrap gap-2">
            {event.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-wider bg-slate-800/60 text-slate-400 border border-slate-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Tentative Schedule (Fall Fest) ── */}
        {event.programTracks && event.programTracks.length > 0 && (
          <section className="px-4 max-w-5xl mx-auto mb-14">
            <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="font-mono text-[0.675rem] font-bold uppercase tracking-widest text-cyan-400">
                  Tentative Schedule
                </span>
                <h2 className="font-display text-2xl font-bold text-white mt-1 tracking-tight">
                  Fall Fest Schedule & Curriculum
                </h2>
              </div>
              {event.registrationUrl && event.status === 'upcoming' && (
                <a
                  href={event.registrationUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
                >
                  Register Now →
                </a>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {event.programTracks.map((t, idx) => (
                <div
                  key={t.stage || t.day || idx}
                  className="relative p-6 rounded-2xl bg-gradient-to-b from-[#0b131a] via-[#080d12] to-[#05070a] border border-cyan-900/40 hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl"
                >
                  {/* Subtle step watermark */}
                  <span className="absolute -right-2 -bottom-4 text-7xl font-bold font-mono text-cyan-500/[0.04] select-none pointer-events-none group-hover:text-cyan-500/[0.09] transition-colors">
                    {`0${idx + 1}`}
                  </span>

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-full font-mono text-[0.625rem] font-bold tracking-wider uppercase border bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                        {t.stage ? `${t.stage} · ${t.badge}` : `${t.day} · ${t.badge}`}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2 leading-snug">{t.title}</h3>
                    <p className="font-mono text-xs text-slate-300/90 leading-relaxed">{t.desc}</p>
                  </div>

                  {t.footnote && (
                    <div className="mt-4 pt-3 border-t border-cyan-900/40 flex items-center gap-2 font-mono text-[11px] text-amber-400 font-medium">
                      <span>⏱</span>
                      <span>{t.footnote}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Key Details Box ── */}
        {event.keyDetails && event.keyDetails.length > 0 && (
          <section className="px-4 max-w-5xl mx-auto mb-14">
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-[0.675rem] font-bold uppercase tracking-widest text-cyan-400">
                ✦ Key Details
              </span>
            </div>
            <div className="rounded-2xl border border-cyan-500/25 bg-[#080d12]/90 backdrop-blur-xl overflow-hidden divide-y divide-cyan-500/15 shadow-2xl">
              {event.keyDetails.map((row, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-6 px-6 py-4 hover:bg-cyan-500/[0.04] transition-colors"
                >
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400 shrink-0 sm:w-60 pt-0.5">
                    {row.label}
                  </span>
                  <span className="text-sm text-slate-200 font-body leading-relaxed">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Highlights / Key Technical Tracks ── */}
        {event.highlights && event.highlights.length > 0 && (
          <section className="px-4 max-w-5xl mx-auto mb-14">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#080d12]/80 border border-cyan-500/20 shadow-xl">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-4">
                ✦ Key Technical Tracks
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 m-0 p-0 list-none">
                {event.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="text-cyan-400 font-mono shrink-0">✦</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── Related Events ── */}
        {relatedEvents.length > 0 && (
          <section className="px-4 max-w-5xl mx-auto mb-16">
            <h2 className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-6 border-b border-slate-800 pb-3">
              More in {event.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedEvents.map(rel => (
                <Link
                  key={rel.id}
                  to={rel.id === 'qiskit-fall-fest-2025' ? '/fallfest' : `/events/${rel.id}`}
                  className="group p-5 rounded-xl border border-slate-800 bg-slate-900/30 hover:border-emerald-700/50 hover:bg-slate-900/60 transition-all duration-300 flex flex-col gap-2"
                >
                  {rel.coverImage && (
                    <div className="w-full aspect-video rounded-lg overflow-hidden mb-1">
                      <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <span className={`font-mono text-[10px] uppercase tracking-wider ${colorScheme.text}`}>{rel.dateDisplay || rel.date}</span>
                  <h3 className="font-display font-semibold text-white text-sm leading-snug group-hover:text-emerald-300 transition-colors">{rel.title}</h3>
                  {rel.excerpt && <p className="font-mono text-xs text-slate-400 line-clamp-2 leading-relaxed">{rel.excerpt}</p>}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Photo Gallery (always last) ── */}
        {hasGallery && (
          <section className="py-16 px-4 border-t border-slate-800/60 bg-[#060908]/60">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-8 text-center">
                Event Gallery — {event.gallery.length} Photos
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {event.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900 cursor-zoom-in group border border-slate-800 hover:border-emerald-600/50 transition-colors"
                    onClick={() => setLightboxImg(idx)}
                  >
                    <img
                      src={img.url}
                      alt={img.caption || `Gallery image ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Footer Nav ── */}
        <footer className="py-8 px-4 border-t border-slate-800">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <Link to="/events" className="font-mono text-xs uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors">
              ← Back to all events
            </Link>
            {event.status === 'upcoming' && event.registrationUrl && (
              <a href={event.registrationUrl} className="font-mono text-xs uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors">
                Register Now →
              </a>
            )}
          </div>
        </footer>

      </article>

      {/* ── Lightbox ── */}
      {lightboxImg !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightboxImg(null)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev / Next */}
          {lightboxImg > 0 && (
            <button
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightboxImg(lightboxImg - 1) }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {lightboxImg < event.gallery.length - 1 && (
            <button
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightboxImg(lightboxImg + 1) }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <img
            src={event.gallery[lightboxImg].url}
            alt={event.gallery[lightboxImg].caption}
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          {event.gallery[lightboxImg].caption && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-white/60 bg-black/50 px-4 py-1.5 rounded-full">
              {event.gallery[lightboxImg].caption}
            </p>
          )}
        </div>
      )}
    </main>
  )
}
