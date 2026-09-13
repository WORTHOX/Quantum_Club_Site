import { useRef, useState } from 'react'
import stories from '../../data/stories.json'

const STORY_IMAGES = {
  workshops: '/assets/events/iiser-visit-extra/photo-6.jpg',
  speakers: '/assets/events/fall-fest-2025/photo-5.jpg',
  research: '/assets/events/iiser-visit/photo-8.jpg',
  community: '/assets/events/ice-breaker-2026/photo-5.jpg',
}

export default function QuantumLifeStories() {
  const [activeStory, setActiveStory] = useState(null)
  const dialogRef = useRef(null)

  const openStory = (story) => {
    setActiveStory(story)
    dialogRef.current?.showModal()
  }

  const closeStory = () => {
    dialogRef.current?.close()
  }

  return (
    <section className="py-20 sm:py-28 bg-transparent text-white relative" id="quantum-life">
      {/* Centered Heading */}
      <div className="w-full max-w-3xl mx-auto px-5 sm:px-8 text-center mb-12">
        <span className="font-pixel text-[11px] font-bold tracking-widest text-purple-300 uppercase block mb-3">
          Life at SQC
        </span>
        <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-white tracking-tight m-0">
          Inside the Quantum Community
        </h2>
        <p className="font-body text-base sm:text-[1.05rem] text-slate-300 mt-3 max-w-[52ch] mx-auto leading-[1.7]">
          Workshops, guest lectures, research visits, and collaborative sessions that define our community.
        </p>
      </div>

      {/* Centered Cards Grid */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 justify-center">
          {stories.map((story) => {
            const imgSrc = STORY_IMAGES[story.id] || '/assets/events/iiser-visit/photo-1.jpg'
            return (
              <button
                key={story.id}
                className="w-full max-w-sm sm:max-w-none mx-auto text-left rounded-2xl overflow-hidden bg-[#0a0714]/60 border border-white/[0.08] shadow-lg transition-all duration-300 cursor-pointer hover:border-purple-400/45 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)] group flex flex-col"
                onClick={() => openStory(story)}
                aria-label={`View ${story.title} story`}
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#07040d] relative w-full">
                  <img
                    src={imgSrc}
                    alt={story.title}
                    className={`w-full h-full object-cover brightness-85 group-hover:scale-[1.05] group-hover:brightness-95 transition-all duration-500 ${
                      story.id === 'community' ? 'object-[center_75%]' : 'object-center'
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0714] via-transparent to-transparent opacity-75" />
                </div>
                <div className="p-5 flex flex-col gap-1.5 flex-1 justify-between">
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-purple-200 transition-colors m-0 leading-snug">
                      {story.title}
                    </h3>
                    <p className="font-body text-sm text-slate-400 line-clamp-2 leading-[1.65] mt-1.5 mb-0">
                      {story.description}
                    </p>
                  </div>
                  <div className="pt-3 mt-auto flex items-center gap-1.5 font-pixel text-[10px] text-purple-300/70 group-hover:text-purple-200 transition-colors uppercase tracking-wider">
                    <span>Explore</span>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Native Modal Dialog */}
      <dialog 
        ref={dialogRef} 
        className="w-[min(92vw,680px)] rounded-2xl bg-[#120d1c] text-slate-200 border border-white/15 shadow-2xl p-0 backdrop:bg-black/80 backdrop:backdrop-blur-md overflow-hidden m-auto" 
        onClose={() => setActiveStory(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) closeStory()
        }}
      >
        {activeStory && (
          <div className="relative flex flex-col">
            <button 
              className="absolute top-3 right-3 z-10 text-white p-2 rounded-full bg-black/60 backdrop-blur-md hover:bg-white/20 transition-colors" 
              onClick={closeStory} 
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="aspect-video bg-[#07040d] overflow-hidden relative">
              <img
                src={STORY_IMAGES[activeStory.id] || '/assets/events/iiser-visit/photo-1.jpg'}
                alt={activeStory.title}
                className={`w-full h-full object-cover ${
                  activeStory.id === 'community' ? 'object-[center_75%]' : 'object-center'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120d1c] to-transparent opacity-60" />
            </div>
            <div className="p-5 sm:p-8 flex flex-col gap-3">
              <div className="flex items-center gap-2 font-pixel text-[11px] text-[#c084fc] uppercase tracking-wider font-semibold">
                <span>✦ SQC INITIATIVE</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white m-0">
                {activeStory.title}
              </h3>
              <p className="font-body text-base text-slate-300 leading-relaxed m-0">
                {activeStory.description}
              </p>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
