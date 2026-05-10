import React from 'react';
import { Users, CheckCircle2, Clock, XCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { formatDuration } from '../data/mockData';
import { useDashboard } from '../context/DashboardContext';

export const KpiStrip: React.FC = () => {
  const { totals, selectedSource } = useDashboard();
  const { total, accepted, rejected, avgTime } = totals;

  const kpis = [
    {
      label:  'Total Leads',
      value:  total.toLocaleString(),
      icon:   Users,
      color:  '#4F9CF9',
      bg:     'rgba(79,156,249,0.12)',
      trend:  selectedSource ? 'filtered' : '+8.2%',
      up:     true,
    },
    {
      label:  'Accept Rate',
      value:  total ? `${Math.round((accepted / total) * 100)}%` : '—',
      icon:   CheckCircle2,
      color:  '#00EBC7',
      bg:     'rgba(0,235,199,0.12)',
      trend:  '+3.1%',
      up:     true,
    },
    {
      label:  'Avg Form Time',
      value:  avgTime ? formatDuration(avgTime) : '—',
      icon:   Clock,
      color:  '#F97316',
      bg:     'rgba(249,115,22,0.12)',
      trend:  'Normal',
      up:     true,
    },
    {
      label:  'Rejected',
      value:  rejected.toLocaleString(),
      icon:   XCircle,
      color:  '#FF4D79',
      bg:     'rgba(255,77,121,0.12)',
      trend:  total ? `${Math.round((rejected / total) * 100)}% rate` : '—',
      up:     false,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-5">
      {kpis.map(kpi => {
        const Icon      = kpi.icon;
        const TrendIcon = kpi.up ? TrendingUp : TrendingDown;
        return (
          <div key={kpi.label}
            className="relative overflow-hidden rounded-2xl p-5 border border-border_subtle transition-transform duration-200 hover:scale-[1.02]"
            style={{ background: '#0F1330' }}
          >
            {/* Glow */}
            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl pointer-events-none"
                 style={{ background: kpi.color, opacity: 0.15 }} />

            <div className="relative">
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                     style={{ background: kpi.bg }}>
                  <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                </div>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: kpi.up ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                        color:      kpi.up ? '#22C55E' : '#EF4444',
                      }}>
                  <TrendIcon className="w-3 h-3" />
                  {kpi.trend}
                </span>
              </div>
              <p className="text-3xl font-bold text-white mb-1 leading-none">{kpi.value}</p>
              <p className="text-secondary text-sm mt-2">{kpi.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
