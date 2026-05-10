import React, { useState } from 'react';
import {
  LayoutDashboard, Users, Database, BarChart2, Settings,
  Bell, Search, TrendingUp, Zap, ChevronRight,
} from 'lucide-react';
import { LeadOpsPage } from './pages/LeadOpsPage';

const NAV = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Users,           label: 'Leads' },
  { icon: Database,        label: 'Sources' },
  { icon: BarChart2,       label: 'Analytics' },
  { icon: Settings,        label: 'Settings' },
];

export const LeadOpsApp: React.FC = () => {
  const [active, setActive] = useState('Dashboard');

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#060918' }}>

      {/* ── Sidebar ── */}
      <aside className="w-60 flex-shrink-0 flex flex-col border-r border-border_subtle" style={{ background: '#0B0E27' }}>

        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-border_subtle">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center mr-3"
            style={{ background: 'linear-gradient(135deg,#4F9CF9,#7C5CFC)', boxShadow: '0 4px 14px rgba(79,156,249,0.4)' }}
          >
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">LeadOps</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-5 px-3 space-y-0.5">
          <p className="text-muted text-xs font-semibold uppercase tracking-wider px-3 mb-3">Main Menu</p>
          {NAV.map(({ icon: Icon, label }) => {
            const on = active === label;
            return (
              <button
                key={label}
                onClick={() => setActive(label)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                style={on
                  ? { background: 'rgba(79,156,249,0.12)', color: '#4F9CF9' }
                  : { color: '#8892B0' }
                }
                onMouseEnter={e => { if (!on) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                onMouseLeave={e => { if (!on) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{label}</span>
                {on && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-50" />}
              </button>
            );
          })}
        </nav>

        {/* Upgrade card */}
        <div className="p-4">
          <div
            className="rounded-2xl p-4 border border-accent_purple/20"
            style={{ background: 'linear-gradient(135deg,rgba(124,92,252,0.18),rgba(79,156,249,0.08))' }}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                 style={{ background: 'rgba(124,92,252,0.2)' }}>
              <TrendingUp className="w-4 h-4 text-accent_purple" />
            </div>
            <p className="text-white text-sm font-semibold mb-1">Pro Analytics</p>
            <p className="text-secondary text-xs leading-relaxed mb-3">Unlock deeper insights and export tools</p>
            <button
              className="w-full py-2 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-80"
              style={{ background: 'linear-gradient(90deg,#7C5CFC,#4F9CF9)' }}
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <header
          className="h-16 flex-shrink-0 flex items-center justify-between px-6 border-b border-border_subtle"
          style={{ background: 'rgba(11,14,39,0.8)', backdropFilter: 'blur(12px)' }}
        >
          <div>
            <h1 className="text-white text-xl font-bold leading-tight">Dashboard</h1>
            <p className="text-secondary text-xs mt-0.5">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {[Search, Bell].map((Icon, i) => (
              <button
                key={i}
                className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-border_subtle transition-colors hover:bg-white/5"
              >
                <Icon className="w-4 h-4 text-secondary" />
                {i === 1 && (
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: '#FF4D79' }} />
                )}
              </button>
            ))}

            <div className="flex items-center gap-2.5 ml-2 pl-4 border-l border-border_subtle">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ background: 'linear-gradient(135deg,#4F9CF9,#7C5CFC)' }}
              >
                A
              </div>
              <div>
                <p className="text-white text-xs font-semibold leading-tight">Admin User</p>
                <p className="text-secondary text-xs leading-tight">admin@leadops.in</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <LeadOpsPage />
        </main>
      </div>
    </div>
  );
};
