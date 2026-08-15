import { useRef, useState } from 'react'
import stories from '../../data/stories.json'

const STORY_IMAGES = {
  workshops: '/assets/events/iiser-visit/photo-2.jpg',
  hackathon: '/assets/fallfest/Entanglement.png',
  speakers: '/assets/events/iiser-visit/photo-6.jpg',
  lab: '/assets/events/iiser-visit/photo-8.jpg',
  community: '/assets/events/iiser-visit/photo-11.jpg',
}

export default function QuantumLifeStories() {
  const [activeStory, setActiveStory] = useState(null)
  const trackRef = useRef(null)
  const dialogRef = useRef(null)

  const openStory = (story) => {
    setActiveStory(story)
    dialogRef.current?.showModal()
  }

  const closeStory = () => {
    dialogRef.current?.close()
    setActiveStory(null)
  }

  return (
    <section className="py-24 sm:py-32 bg-[#07040d] text-white relative overflow-hidden" id="quantum-life">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-[2px] bg-gradient-to-r from-[#a855f7] to-[#ec4899]" />
          <span className="font-mono text-xs font-bold tracking-widest text-[#c084fc] uppercase">
            LIFE AT SQC
          </span>
        </div>
        <h2 className="font-display text-[clamp(2.2rem,3.8vw,3.2rem)] font-extrabold text-white tracking-tight m-0">
          Inside the Quantum Community
        </h2>
        <p className="font-body text-base sm:text-lg text-slate-300 mt-2 max-w-[55ch]">
          Explore the workshops, hackathons, research discussions, and lab sessions that define our student society.
        </p>
      </div>

      {/* Horizontal Story Card Slider */}
      <div className="w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-8" ref={trackRef}>
        <div className="flex gap-6 px-5 sm:px-8 md:px-12 lg:px-16 w-max group/slider">
          {stories.map((story) => {
            const imgSrc = STORY_IMAGES[story.id] || '/assets/events/iiser-visit/photo-1.jpg'
            return (
              <button
                key={story.id}
                className="shrink-0 w-[290px] sm:w-[340px] text-left rounded-2xl overflow-hidden bg-[#120d1c]/90 border border-white/10 shadow-xl transition-all duration-300 cursor-pointer group/slider:hover:opacity-70 hover:!opacity-100 hover:scale-[1.03] hover:border-[#a855f7]/50 group"
                onClick={() => openStory(story)}
                aria-label={`View ${story.title} story`}
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#07040d] relative">
                  <img
                    src={imgSrc}
                    alt={story.title}
                    className="w-full h-full object-cover brightness-90 group-hover:scale-108 group-hover:brightness-100 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120d1c] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full font-mono text-[0.65rem] font-bold uppercase tracking-wider bg-[#07040d]/80 text-[#c084fc] border border-[#a855f7]/30 backdrop-blur-md">
                    {story.title}
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-1.5">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#c084fc] transition-colors m-0">
                    {story.title}
                  </h3>
                  <p className="font-body text-sm text-slate-300 line-clamp-2 leading-relaxed m-0">
                    {story.description}
                  </p>
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
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120d1c] to-transparent opacity-60" />
            </div>
            <div className="p-6 sm:p-8 flex flex-col gap-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#c084fc] uppercase tracking-wider font-semibold">
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
