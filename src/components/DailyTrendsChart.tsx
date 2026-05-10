import React, { useState } from 'react';
import { formatDate } from '../data/mockData';
import { useDashboard } from '../context/DashboardContext';

const W = 800, H = 220;
const pL = 50, pR = 20, pT = 20, pB = 36;
const cW = W - pL - pR, cH = H - pT - pB;

const RANGES = [
  { label: '7D',  days: 7  },
  { label: '14D', days: 14 },
  { label: '30D', days: 30 },
  { label: 'All', days: 0  },
];

export const DailyTrendsChart: React.FC = () => {
  const { chartData: data, days, setDays } = useDashboard();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  if (data.length < 2) return null;

  const leads  = data.map(d => d.leads);
  const maxL   = Math.max(...leads), minL = Math.min(...leads);
  const range  = maxL - minL || 1;

  const gx  = (i: number) => pL + (i / (data.length - 1)) * cW;
  const gy  = (v: number) => pT + (1 - (v - minL) / range) * cH;
  const gr  = (v: number) => pT + (1 - Math.max(0, (v - 40) / 60)) * cH;

  const leadsPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${gx(i).toFixed(1)},${gy(d.leads).toFixed(1)}`).join(' ');
  const leadsArea = `${leadsPath} L${gx(data.length-1).toFixed(1)},${(pT+cH).toFixed(1)} L${pL},${(pT+cH).toFixed(1)} Z`;
  const ratePath  = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${gx(i).toFixed(1)},${gr(d.acceptanceRate).toFixed(1)}`).join(' ');

  const yTicks  = [maxL, Math.round((maxL + minL) / 2), minL];
  const xStep   = Math.max(1, Math.floor(data.length / 6));
  const total   = leads.reduce((s, v) => s + v, 0);
  const avgRate = (data.reduce((s, d) => s + d.acceptanceRate, 0) / data.length).toFixed(1);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * W;
    const idx  = Math.max(0, Math.min(data.length - 1, Math.round((svgX - pL) / cW * (data.length - 1))));
    setHoverIdx(idx);
  };

  // Tooltip
  const renderTooltip = () => {
    if (hoverIdx === null) return null;
    const d    = data[hoverIdx];
    const x    = gx(hoverIdx);
    const y1   = gy(d.leads);
    const y2   = gr(d.acceptanceRate);
    const tipW = 145, tipH = 78;
    const tipX = x > W * 0.65 ? x - tipW - 10 : x + 10;
    const tipY = pT + 4;

    return (
      <g style={{ pointerEvents: 'none' }}>
        {/* Cursor line */}
        <line x1={x} y1={pT} x2={x} y2={pT + cH}
              stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 3" />

        {/* Data dots */}
        <circle cx={x} cy={y1} r="5" fill="#0F1330" stroke="#4F9CF9" strokeWidth="2.5" />
        <circle cx={x} cy={y2} r="5" fill="#0F1330" stroke="#00EBC7" strokeWidth="2.5" />

        {/* Tooltip card */}
        <rect x={tipX} y={tipY} width={tipW} height={tipH} rx="8"
              fill="#1A2248" stroke="rgba(79,156,249,0.3)" strokeWidth="1" />

        <text x={tipX + 11} y={tipY + 19} fill="rgba(255,255,255,0.5)"
              fontSize="10" fontFamily="Inter,sans-serif">
          {formatDate(d.date)}
        </text>

        <circle cx={tipX + 14} cy={tipY + 35} r="3.5" fill="#4F9CF9" />
        <text x={tipX + 24} y={tipY + 39} fill="white"
              fontSize="12" fontWeight="bold" fontFamily="Inter,sans-serif">
          {d.leads.toLocaleString()} leads
        </text>

        <circle cx={tipX + 14} cy={tipY + 56} r="3.5" fill="#00EBC7" />
        <text x={tipX + 24} y={tipY + 60} fill="#00EBC7"
              fontSize="11" fontFamily="Inter,sans-serif">
          {d.acceptanceRate.toFixed(1)}% accepted
        </text>
      </g>
    );
  };

  return (
    <div className="rounded-2xl p-5 border border-border_subtle" style={{ background: '#0F1330' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white text-sm font-semibold">Daily Performance Trends</h3>
          <p className="text-muted text-xs mt-0.5">{data.length} days · {total.toLocaleString()} leads · {avgRate}% avg rate</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Legend */}
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-secondary">
              <span className="inline-block w-5 h-0.5 rounded" style={{ background: '#4F9CF9' }} />
              Leads
            </span>
            <span className="flex items-center gap-1.5 text-secondary">
              <span className="inline-block w-5 rounded" style={{ borderTop: '2px dashed #00EBC7', height: 0 }} />
              Rate
            </span>
          </div>

          {/* Date range buttons */}
          <div className="flex items-center rounded-xl overflow-hidden border border-border_subtle">
            {RANGES.map(r => (
              <button key={r.label} onClick={() => setDays(r.days)}
                className="px-3 py-1.5 text-xs font-medium transition-colors"
                style={{
                  background: days === r.days ? 'rgba(79,156,249,0.2)' : 'transparent',
                  color:      days === r.days ? '#4F9CF9' : '#8892B0',
                }}>
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 200, cursor: 'crosshair' }}
           onMouseMove={handleMouseMove}
           onMouseLeave={() => setHoverIdx(null)}>
        <defs>
          <linearGradient id="lGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#4F9CF9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4F9CF9" stopOpacity="0"   />
          </linearGradient>
        </defs>

        {/* Grid */}
        {[0, 0.25, 0.5, 0.75, 1].map(r => (
          <line key={r} x1={pL} y1={pT + r * cH} x2={pL + cW} y2={pT + r * cH}
                stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}

        {/* Y labels */}
        {yTicks.map((v, i) => (
          <text key={i} x={pL - 6} y={gy(v) + 4}
                fill="rgba(255,255,255,0.28)" fontSize="10" textAnchor="end" fontFamily="Inter,sans-serif">
            {v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}
          </text>
        ))}

        {/* X labels */}
        {data.filter((_, i) => i % xStep === 0).map((d, i) => (
          <text key={i} x={gx(i * xStep)} y={H - 6}
                fill="rgba(255,255,255,0.28)" fontSize="10" textAnchor="middle" fontFamily="Inter,sans-serif">
            {formatDate(d.date)}
          </text>
        ))}

        {/* Area + lines */}
        <path d={leadsArea} fill="url(#lGrad)" />
        <path d={leadsPath} fill="none" stroke="#4F9CF9" strokeWidth="2" strokeLinejoin="round" />
        <path d={ratePath}  fill="none" stroke="#00EBC7" strokeWidth="1.5"
              strokeDasharray="5 3" strokeLinejoin="round" opacity="0.8" />

        {/* Static end dots (hidden when tooltip is showing) */}
        {hoverIdx === null && (
          <>
            <circle cx={gx(data.length-1)} cy={gy(data[data.length-1].leads)}          r="4" fill="#4F9CF9" />
            <circle cx={gx(data.length-1)} cy={gr(data[data.length-1].acceptanceRate)} r="4" fill="#00EBC7" />
          </>
        )}

        {renderTooltip()}
      </svg>
    </div>
  );
};
