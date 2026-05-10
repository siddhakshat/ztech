import React from 'react';
import { mockData } from '../data/mockData';
import { useDashboard } from '../context/DashboardContext';

const COLORS = ['#4F9CF9','#7C5CFC','#00EBC7','#F97316','#FF4D79','#F5BE00'];

export const LeadSourcesTable: React.FC = () => {
  const { selectedSource, setSource } = useDashboard();
  const sorted   = [...mockData.sources].sort((a, b) => b.leadsTotal - a.leadsTotal);
  const maxLeads = sorted[0]?.leadsTotal || 1;
  const [hovered, setHovered] = React.useState<string | null>(null);

  return (
    <div className="rounded-2xl p-5 border border-border_subtle flex flex-col h-full" style={{ background: '#0F1330' }}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white text-sm font-semibold">Lead Sources</h3>
        <div className="flex items-center gap-2">
          {selectedSource && (
            <button onClick={() => setSource(selectedSource)}
              className="text-xs text-muted hover:text-white transition-colors">
              Clear ×
            </button>
          )}
          <span className="text-muted text-xs">{sorted.length} sources</span>
        </div>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto">
        {sorted.map((source, i) => {
          const rate     = Math.round((source.accepted / source.leadsTotal) * 100);
          const color    = COLORS[i % COLORS.length];
          const pct      = (source.leadsTotal / maxLeads) * 100;
          const isActive = selectedSource === source.name;
          const isHover  = hovered === source.name;

          return (
            <button
              key={source.id}
              onClick={() => setSource(source.name)}
              onMouseEnter={() => setHovered(source.name)}
              onMouseLeave={() => setHovered(null)}
              className="w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150"
              style={{
                background: isActive
                  ? `rgba(${color === '#4F9CF9' ? '79,156,249' : color === '#7C5CFC' ? '124,92,252' : '79,156,249'},0.1)`
                  : isHover ? 'rgba(255,255,255,0.04)' : 'transparent',
                outline: isActive ? `1px solid ${color}30` : 'none',
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-2 h-2 rounded-full flex-shrink-0 transition-transform duration-150"
                       style={{ background: color, transform: isActive || isHover ? 'scale(1.4)' : 'scale(1)' }} />
                  <span className="text-white text-xs font-medium truncate">{source.name}</span>
                </div>
                <div className="flex items-center gap-2.5 flex-shrink-0 ml-2 text-xs">
                  <span className="text-secondary">{source.leadsTotal.toLocaleString()}</span>
                  <span className="font-semibold w-9 text-right" style={{ color }}>{rate}%</span>
                </div>
              </div>

              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full transition-all duration-500"
                     style={{ width: `${pct}%`, background: `linear-gradient(90deg,${color},${color}66)` }} />
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-muted text-xs mt-3 text-center">Click a source to filter</p>
    </div>
  );
};
