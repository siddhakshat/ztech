import React from 'react';
import { mockData, formatDuration } from '../data/mockData';
import { useDashboard } from '../context/DashboardContext';
import { X } from 'lucide-react';

const fieldScore = (field: string) =>
  field === 'email' || field === 'name' ? 95 : field === 'phone' ? 88 : 78;

export const LeadInspection: React.FC = () => {
  const { selectedLead, setSelectedLead } = useDashboard();

  // Build display data from selected lead or fall back to sample
  const isLive = selectedLead !== null;
  const displayData = isLive
    ? {
        formTime:     selectedLead.formTime,
        qualityScore: selectedLead.qualityScore,
        priority:     Math.min(100, Math.round(selectedLead.qualityScore * 0.9)),
        fields: {
          name:   selectedLead.name,
          source: selectedLead.source,
          email:  selectedLead.email,
          status: selectedLead.status,
        } as Record<string, string | number>,
      }
    : {
        formTime:     mockData.leadSample.formTime,
        qualityScore: mockData.leadSample.qualityScore,
        priority:     mockData.leadSample.priority,
        fields:       mockData.leadSample.data,
      };

  const acceptPct = isLive
    ? displayData.fields.status === 'Accepted' ? 85 : displayData.fields.status === 'Pending' ? 50 : 20
    : 68;

  return (
    <div className="rounded-2xl p-5 border border-border_subtle flex flex-col h-full transition-all duration-200"
         style={{ background: '#0F1330', outline: isLive ? '1px solid rgba(79,156,249,0.25)' : 'none' }}>

      {/* Title */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-white text-sm font-semibold">Lead Inspection</h3>
          {isLive && (
            <p className="text-accent_blue text-xs mt-0.5">{selectedLead.name}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ background: 'rgba(0,235,199,0.12)', color: '#00EBC7' }}>
            {acceptPct}% Accept
          </span>
          {isLive && (
            <button onClick={() => setSelectedLead(null)}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
              <X className="w-3.5 h-3.5 text-muted" />
            </button>
          )}
        </div>
      </div>

      {/* Meters */}
      <div className="space-y-3 mb-5">
        {[
          { label: 'Quality Score', value: displayData.qualityScore, max: 100, display: `${displayData.qualityScore}/100`, grad: 'linear-gradient(90deg,#00EBC7,#4F9CF9)' },
          { label: 'Priority',      value: displayData.priority,     max: 100, display: `${displayData.priority}%`,       grad: 'linear-gradient(90deg,#F97316,#F5BE00)' },
        ].map(m => (
          <div key={m.label}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-secondary">{m.label}</span>
              <span className="text-white font-semibold">{m.display}</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="h-full rounded-full transition-all duration-500"
                   style={{ width: `${(m.value / m.max) * 100}%`, background: m.grad }} />
            </div>
          </div>
        ))}

        <div className="flex justify-between text-xs">
          <span className="text-secondary">Form Time</span>
          <span className="text-white font-semibold">{formatDuration(displayData.formTime)}</span>
        </div>
      </div>

      {/* Field analysis */}
      <div className="border-t border-border_subtle pt-4 flex-1">
        <p className="text-muted text-xs font-medium mb-3">Field Analysis</p>
        <div className="space-y-2">
          {Object.entries(displayData.fields).map(([field, value]) => {
            const score  = fieldScore(field);
            const isGood = score >= 80;
            const color  = isGood ? '#00EBC7' : '#F5BE00';
            return (
              <div key={field}
                className="flex items-center justify-between px-3 py-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className="text-secondary text-xs capitalize">{field}</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-muted truncate max-w-[90px]">{String(value)}</span>
                  <span className="font-semibold w-8 text-right" style={{ color }}>{score}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!isLive && (
        <p className="text-muted text-xs text-center mt-3">Click a table row to inspect</p>
      )}
    </div>
  );
};
