import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

import { DashboardProvider, useDashboard } from '../context/DashboardContext';
import { KpiStrip }         from './KpiStrip';
import { DailyTrendsChart } from './DailyTrendsChart';
import { LeadSourcesTable } from './LeadSourcesTable';
import { GeoDistribution }  from './GeoDistribution';
import { LeadInspection }   from './LeadInspection';
import { mockData, formatDuration } from '../data/mockData';
import { Lead } from '../types';

// ── Active filter bar ────────────────────────────────────────────────────────
const FilterBar: React.FC = () => {
  const { selectedSource, selectedStatus, search, setSource, setStatus, setSearch, clearFilters } = useDashboard();
  const active = selectedSource || selectedStatus || search;
  if (!active) return null;

  const pill = (label: string, onClear: () => void, color = '#4F9CF9') => (
    <span key={label}
      className="flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-full text-xs font-medium"
      style={{ background: `${color}18`, color }}>
      {label}
      <button onClick={onClear}
        className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
        <X className="w-2.5 h-2.5" />
      </button>
    </span>
  );

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-muted text-xs">Filters:</span>
      {selectedSource && pill(selectedSource, () => setSource(selectedSource), '#4F9CF9')}
      {selectedStatus && pill(selectedStatus,
        () => setStatus(selectedStatus),
        selectedStatus === 'Accepted' ? '#00EBC7' : selectedStatus === 'Rejected' ? '#FF4D79' : '#F5BE00')}
      {search && pill(`"${search}"`, () => setSearch(''), '#7C5CFC')}
      <button onClick={clearFilters}
        className="ml-auto text-muted text-xs hover:text-white transition-colors">
        Clear all
      </button>
    </div>
  );
};

// ── Acceptance donut (clickable segments filter the lead table) ───────────────
const AcceptanceDonut: React.FC = () => {
  const { totals, selectedStatus, setStatus } = useDashboard();
  const { total, accepted, rejected, pending } = totals;
  const [hovered, setHovered] = useState<Lead['status'] | null>(null);

  const segs: { label: Lead['status']; value: number; color: string }[] = [
    { label: 'Accepted', value: accepted, color: '#00EBC7' },
    { label: 'Pending',  value: pending,  color: '#F5BE00' },
    { label: 'Rejected', value: rejected, color: '#FF4D79' },
  ];

  const r    = 50, cx = 68, cy = 68, sw = 13;
  const circ = 2 * Math.PI * r;
  let cum    = 0;

  return (
    <div className="rounded-2xl p-5 border border-border_subtle flex flex-col h-full" style={{ background: '#0F1330' }}>
      <h3 className="text-white text-sm font-semibold mb-4">Status Breakdown</h3>

      <div className="flex flex-col items-center flex-1 justify-center">
        {/* Donut */}
        <div className="relative mb-5" style={{ cursor: 'pointer' }}>
          <svg viewBox="0 0 136 136" className="w-36 h-36">
            {/* Track */}
            <circle cx={cx} cy={cy} r={r} fill="none"
                    stroke="rgba(255,255,255,0.05)" strokeWidth={sw} />
            {segs.map((seg, i) => {
              const dash   = total ? (seg.value / total) * circ : 0;
              const offset = total ? -(cum / total) * circ : 0;
              const isOn   = selectedStatus === seg.label || hovered === seg.label;
              cum += seg.value;
              return (
                <circle key={i}
                  cx={cx} cy={cy} r={r}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={isOn ? sw + 3 : sw}
                  strokeDasharray={`${dash} ${circ - dash}`}
                  strokeDashoffset={offset}
                  transform={`rotate(-90 ${cx} ${cy})`}
                  style={{ cursor: 'pointer', transition: 'stroke-width 0.15s' }}
                  onClick={() => setStatus(seg.label)}
                  onMouseEnter={() => setHovered(seg.label)}
                  onMouseLeave={() => setHovered(null)}
                />
              );
            })}
          </svg>

          {/* Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {hovered || selectedStatus ? (
              <>
                <p className="text-white text-xl font-bold leading-none">
                  {total ? Math.round(((segs.find(s => s.label === (hovered || selectedStatus))?.value || 0) / total) * 100) : 0}%
                </p>
                <p className="text-muted text-xs mt-1">{hovered || selectedStatus}</p>
              </>
            ) : (
              <>
                <p className="text-white text-2xl font-bold leading-none">
                  {total ? Math.round((accepted / total) * 100) : 0}%
                </p>
                <p className="text-muted text-xs mt-1">Accepted</p>
              </>
            )}
          </div>
        </div>

        {/* Legend — also clickable */}
        <div className="w-full space-y-2.5">
          {segs.map(seg => {
            const isOn = selectedStatus === seg.label;
            return (
              <button
                key={seg.label}
                onClick={() => setStatus(seg.label)}
                onMouseEnter={() => setHovered(seg.label)}
                onMouseLeave={() => setHovered(null)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-150 text-left"
                style={{ background: isOn ? `${seg.color}12` : 'transparent' }}
              >
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform duration-150"
                     style={{ background: seg.color, transform: isOn ? 'scale(1.3)' : 'scale(1)' }} />
                <span className="text-secondary text-xs flex-1">{seg.label}</span>
                <span className="text-white text-xs font-semibold">{seg.value.toLocaleString()}</span>
                <span className="text-muted text-xs w-8 text-right">
                  {total ? Math.round((seg.value / total) * 100) : 0}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-muted text-xs text-center mt-3">Click segment to filter leads</p>
    </div>
  );
};

// ── Lead table with live search + filters ─────────────────────────────────────
const LeadTable: React.FC = () => {
  const { filteredLeads, search, setSearch, selectedStatus, setStatus, selectedLead, setSelectedLead } = useDashboard();

  const statusStyle = (s: string) => ({
    background: s === 'Accepted' ? 'rgba(0,235,199,0.12)'  : s === 'Rejected' ? 'rgba(255,77,121,0.12)'  : 'rgba(245,190,0,0.12)',
    color:      s === 'Accepted' ? '#00EBC7'                : s === 'Rejected' ? '#FF4D79'                 : '#F5BE00',
  });

  const allStatuses: Lead['status'][] = ['Accepted', 'Rejected', 'Pending'];

  return (
    <div className="rounded-2xl border border-border_subtle overflow-hidden" style={{ background: '#0F1330' }}>
      {/* Table header toolbar */}
      <div className="px-5 py-4 border-b border-border_subtle flex items-center gap-3 flex-wrap">
        <h3 className="text-white text-sm font-semibold">Recent Leads</h3>

        {/* Search */}
        <div className="flex items-center gap-2 flex-1 min-w-[180px] max-w-xs px-3 py-1.5 rounded-xl border border-border_subtle"
             style={{ background: 'rgba(255,255,255,0.04)' }}>
          <Search className="w-3.5 h-3.5 text-muted flex-shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name, email, source…"
            className="flex-1 bg-transparent text-white text-xs placeholder-muted outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')}>
              <X className="w-3 h-3 text-muted hover:text-white transition-colors" />
            </button>
          )}
        </div>

        {/* Status filter pills */}
        <div className="flex items-center gap-1.5">
          {allStatuses.map(s => (
            <button key={s} onClick={() => setStatus(s)}
              className="px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-150"
              style={selectedStatus === s ? statusStyle(s) : { color: '#8892B0', background: 'rgba(255,255,255,0.05)' }}>
              {s}
            </button>
          ))}
        </div>

        <span className="text-muted text-xs ml-auto">
          {filteredLeads.length} / {mockData.leads.length}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border_subtle">
              {['Lead', 'Source', 'Status', 'Form Time', 'Score'].map((h, j) => (
                <th key={h}
                  className={`px-5 py-3 text-xs font-medium text-muted uppercase tracking-wider ${j === 4 ? 'text-right' : 'text-left'}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredLeads.slice(0, 15).map((lead, i) => {
              const isSelected = selectedLead?.id === lead.id;
              return (
                <tr key={lead.id}
                  onClick={() => setSelectedLead(isSelected ? null : lead)}
                  className="border-b border-border_subtle/40 cursor-pointer transition-all duration-150"
                  style={{
                    background: isSelected ? 'rgba(79,156,249,0.08)' : 'transparent',
                    outline: isSelected ? '1px solid rgba(79,156,249,0.2)' : 'none',
                  }}
                  onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}
                  onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: `hsl(${200 + (i * 43) % 160},65%,48%)` }}
                      >
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium leading-tight">{lead.name}</p>
                        <p className="text-muted text-xs">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-secondary text-sm">{lead.source}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={statusStyle(lead.status)}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-secondary text-sm">{formatDuration(lead.formTime)}</td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="text-white text-sm font-mono">{lead.qualityScore}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredLeads.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted text-sm">No leads match the current filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Root layout (provides context) ───────────────────────────────────────────
const DashboardInner: React.FC = () => (
  <div className="space-y-5 pb-6">
    {/* Row 1 – KPIs */}
    <KpiStrip />

    {/* Active filters */}
    <FilterBar />

    {/* Row 2 – Chart + Sources */}
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-8"><DailyTrendsChart /></div>
      <div className="col-span-4"><LeadSourcesTable /></div>
    </div>

    {/* Row 3 – Geo + Inspection + Donut */}
    <div className="grid grid-cols-12 gap-5" style={{ minHeight: 320 }}>
      <div className="col-span-5"><GeoDistribution /></div>
      <div className="col-span-4"><LeadInspection /></div>
      <div className="col-span-3"><AcceptanceDonut /></div>
    </div>

    {/* Row 4 – Lead table */}
    <LeadTable />
  </div>
);

export const DashboardLayout: React.FC = () => (
  <DashboardProvider>
    <DashboardInner />
  </DashboardProvider>
);
