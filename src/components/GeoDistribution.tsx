import React, { useState } from 'react';
import { mockData } from '../data/mockData';

export const GeoDistribution: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const geoMap: Record<string, number> = {};
  mockData.sources.forEach(src => {
    Object.entries(src.geoDistribution).forEach(([state, count]) => {
      if (state && state !== 'Unknown') geoMap[state] = (geoMap[state] || 0) + count;
    });
  });

  const states   = Object.entries(geoMap).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const maxVal   = states[0]?.[1] || 1;
  const totalGeo = states.reduce((s, [, v]) => s + v, 0);

  return (
    <div className="rounded-2xl p-5 border border-border_subtle h-full" style={{ background: '#0F1330' }}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white text-sm font-semibold">Geographic Distribution</h3>
        <span className="text-muted text-xs">Top {states.length} states</span>
      </div>

      <div className="space-y-1.5">
        {states.map(([state, count], i) => {
          const pct      = (count / maxVal) * 100;
          const share    = Math.round((count / totalGeo) * 100);
          const isHover  = hovered === state;

          return (
            <div
              key={state}
              className="flex items-center gap-3 px-2 py-2 rounded-xl transition-all duration-150 cursor-default"
              style={{ background: isHover ? 'rgba(79,156,249,0.06)' : 'transparent' }}
              onMouseEnter={() => setHovered(state)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Rank */}
              <span className="text-muted text-xs w-4 flex-shrink-0 text-center font-mono">
                {i + 1}
              </span>

              {/* State name */}
              <span
                className="text-xs w-28 flex-shrink-0 truncate transition-colors duration-150"
                style={{ color: isHover ? 'white' : '#8892B0' }}
              >
                {state}
              </span>

              {/* Bar */}
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${pct}%`,
                    background: isHover
                      ? 'linear-gradient(90deg,#4F9CF9,#00EBC7)'
                      : `linear-gradient(90deg,#4F9CF9,#7C5CFC)`,
                    opacity: 1 - i * 0.07,
                    boxShadow: isHover ? '0 0 8px rgba(79,156,249,0.6)' : 'none',
                  }}
                />
              </div>

              {/* Count + share */}
              <span className="text-secondary text-xs w-10 text-right flex-shrink-0">
                {isHover ? `${share}%` : count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
