import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";

export default function TeamCard({ 
  name, 
  role, 
  bio, 
  icon, 
  image, 
  linkedin, 
  compact = false,
  rotated = false 
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const cardContent = (
    <Card className="bg-[#060a20] border-gray-800 hover:border-blue-900/50 transition-all duration-300 hover:-translate-y-1 w-full h-full flex flex-col justify-between group overflow-hidden relative">
      <CardContent className={`${compact ? 'p-4' : 'p-6'} text-center flex flex-col items-center justify-between h-full relative z-10`}>
        {image ? (
          <div className={`${compact ? 'w-20 h-20' : 'w-24 h-24'} mx-auto mb-3 rounded-full overflow-hidden border-2 border-blue-500/40 relative group-hover:border-blue-400 transition-colors`}>
            <img 
              src={image} 
              alt={name} 
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${rotated ? 'rotate-90' : ''}`}
            />
          </div>
        ) : (
          <div className={`${compact ? 'w-14 h-14' : 'w-20 h-20'} mx-auto mb-3 rounded-full bg-blue-900/20 border border-blue-900/40 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform`}>
            {icon || (
              <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="7" r="4" />
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              </svg>
            )}
          </div>
        )}

        <div>
          <h3 className={`font-title ${compact ? 'text-base' : 'text-xl'} font-semibold text-white group-hover:text-blue-400 transition-colors`}>
            {linkedin && linkedin !== "#" ? (
              <a 
                href={linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline flex items-center justify-center gap-1.5"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                {name}
                <svg className="w-4 h-4 text-blue-400 opacity-60 group-hover:opacity-100 transition-opacity inline" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.6 1.6 0 1 0 1.6 1.6 1.61 1.61 0 0 0-1.6-1.6z"/>
                </svg>
              </a>
            ) : (
              name
            )}
          </h3>
          <p className="text-blue-400 font-display text-sm font-medium mt-1">{role}</p>
        </div>

        {bio ? (
          <p className={`${compact ? 'text-xs' : 'text-sm'} font-display text-gray-400 line-clamp-3 mt-3 leading-relaxed`}>{bio}</p>
        ) : null}
      </CardContent>

      {/* Decorative shade LinkedIn logo on hover */}
      <svg className="absolute -bottom-4 -right-4 w-28 h-28 text-blue-500/5 group-hover:text-blue-500/15 transition-all duration-500 group-hover:scale-110 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.6 1.6 0 1 0 1.6 1.6 1.61 1.61 0 0 0-1.6-1.6z"/>
      </svg>
    </Card>
  );

  return cardContent;
}
