import React, { createContext, useContext, useState, useMemo } from 'react';
import { mockData } from '../data/mockData';
import { Lead } from '../types';

type LeadStatus = Lead['status'];

interface DashboardCtx {
  // filter state
  selectedSource: string | null;
  selectedStatus: LeadStatus | null;
  search:         string;
  days:           number;
  selectedLead:   Lead | null;

  // setters (source & status toggle on re-click)
  setSource:       (s: string) => void;
  setStatus:       (s: LeadStatus) => void;
  setSearch:       (s: string) => void;
  setDays:         (d: number) => void;
  setSelectedLead: (l: Lead | null) => void;
  clearFilters:    () => void;

  // derived data
  filteredLeads:   Lead[];
  filteredSources: typeof mockData.sources;
  chartData:       typeof mockData.dailyData;
  totals: { total: number; accepted: number; rejected: number; pending: number; avgTime: number };
}

const Ctx = createContext<DashboardCtx>(null!);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSource, setSourceRaw] = useState<string | null>(null);
  const [selectedStatus, setStatusRaw] = useState<LeadStatus | null>(null);
  const [search,         setSearch]    = useState('');
  const [days,           setDays]      = useState(30);
  const [selectedLead,   setSelectedLead] = useState<Lead | null>(null);

  const setSource = (s: string) => setSourceRaw(p => p === s ? null : s);
  const setStatus = (s: LeadStatus) => setStatusRaw(p => p === s ? null : s);
  const clearFilters = () => {
    setSourceRaw(null); setStatusRaw(null); setSearch(''); setSelectedLead(null);
  };

  const filteredSources = useMemo(() =>
    selectedSource ? mockData.sources.filter(s => s.name === selectedSource) : mockData.sources,
    [selectedSource],
  );

  const filteredLeads = useMemo(() => {
    const q = search.toLowerCase();
    return mockData.leads.filter(lead => {
      if (selectedSource && lead.source !== selectedSource) return false;
      if (selectedStatus && lead.status !== selectedStatus) return false;
      if (q && !lead.name.toLowerCase().includes(q) && !lead.email.toLowerCase().includes(q) && !lead.source.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [selectedSource, selectedStatus, search]);

  const chartData = useMemo(() =>
    days > 0 ? mockData.dailyData.slice(-days) : mockData.dailyData,
    [days],
  );

  const totals = useMemo(() => {
    const srcs     = filteredSources;
    const total    = srcs.reduce((s, src) => s + src.leadsTotal, 0);
    const accepted = srcs.reduce((s, src) => s + src.accepted,   0);
    const rejected = srcs.reduce((s, src) => s + src.rejected,   0);
    const pending  = srcs.reduce((s, src) => s + src.pending,    0);
    const avgTime  = srcs.length
      ? Math.round(srcs.reduce((s, src) => s + src.avgFormTime, 0) / srcs.length)
      : 0;
    return { total, accepted, rejected, pending, avgTime };
  }, [filteredSources]);

  return (
    <Ctx.Provider value={{
      selectedSource, selectedStatus, search, days, selectedLead,
      setSource, setStatus, setSearch, setDays, setSelectedLead, clearFilters,
      filteredLeads, filteredSources, chartData, totals,
    }}>
      {children}
    </Ctx.Provider>
  );
};

export const useDashboard = () => useContext(Ctx);
