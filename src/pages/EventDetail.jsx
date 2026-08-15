import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import events from '../data/events'

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [lightboxImg, setLightboxImg] = useState(null)

  useEffect(() => {
    const found = events.find(e => e.id === id)
    if (found) {
      setEvent(found)
      document.title = `${found.title} — SQC Events`
    } else {
      setEvent(null)
    }
  }, [id])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && lightboxImg !== null) setLightboxImg(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxImg])

  if (event === null) {
    return (
      <main className="min-h-dvh flex items-center justify-center bg-[#060a20] p-6 text-center">
        <div className="max-w-md flex flex-col items-center gap-4">
          <span className="font-mono text-7xl font-bold text-gray-700">404</span>
          <h1 className="text-3xl font-bold text-white">Event Not Found</h1>
          <p className="text-gray-400 text-sm">The event you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/events')} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors">
            Back to Events
          </button>
        </div>
      </main>
    )
  }

  const relatedEvents = events
    .filter(e => e.category === event.category && e.id !== event.id)
    .slice(0, 3)

  return (
    <main className="bg-[#09090b] min-h-dvh pt-[calc(72px+clamp(2rem,1.25rem+3.75vw,5rem))] pb-20">
      <article>
        
        {/* Header */}
        <header className="px-4 pb-12 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-3 flex-wrap font-mono text-xs uppercase tracking-wider">
              <span className="text-blue-400 font-bold px-3 py-1 rounded bg-blue-950/60 border border-blue-900/40">
                {event.category}
              </span>
              <span className="text-gray-400">
                {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              {event.location && (
                <span className="text-gray-400 pl-3 border-l border-gray-800">
                  {event.location}
                </span>
              )}
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold font-display text-white tracking-tight mt-2 mb-2 reveal-up">
              {event.title}
            </h1>
            
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed reveal-up">
              {event.description}
            </p>

            {new Date(event.date) > new Date() && event.registrationLink && (
              <div className="mt-6 reveal-up">
                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-blue-500/25">
                  Register Now &rarr;
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Cover Image */}
        {event.coverImage && (
          <div className="px-4 max-w-5xl mx-auto mb-16">
            <div className="w-full aspect-[21/9] rounded-xl overflow-hidden bg-[#040716] border border-gray-800 shadow-2xl">
              <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-4 max-w-3xl mx-auto mb-16">
          {event.content ? (
            <div 
              className="prose prose-invert max-w-none text-gray-300 prose-headings:font-display prose-headings:text-white prose-a:text-blue-400"
              dangerouslySetInnerHTML={{ __html: event.content }} 
            />
          ) : (
            <div className="text-center py-12 border-y border-gray-800">
              <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">Detailed recap coming soon.</p>
            </div>
          )}
        </div>

        {/* Gallery */}
        {event.gallery && event.gallery.length > 0 && (
          <section className="py-16 px-4 bg-[#040716] border-t border-gray-800">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Event Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {event.gallery.map((img, idx) => (
                  <button 
                    key={idx} 
                    className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-900 cursor-zoom-in group border border-gray-800 transition-colors hover:border-blue-500/50"
                    onClick={() => setLightboxImg(idx)}
                  >
                    <img src={img.url} alt={img.caption || `Gallery image ${idx + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer Navigation */}
        <footer className="py-8 px-4 border-t border-gray-800">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/events" className="font-mono text-xs uppercase tracking-wider text-blue-400 hover:text-blue-300">
              &larr; Back to all events
            </Link>
          </div>
        </footer>

      </article>
    </main>
  )
}
