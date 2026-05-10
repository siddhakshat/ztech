// LeadOps - Type Definitions

export interface LeadSource {
  id: string;
  name: string;
  leadsTotal: number;
  accepted: number;
  rejected: number;
  pending: number;
  avgFormTime: number;
  geoDistribution: Record<string, number>;
}

export interface LeadOutcome {
  source: string;
  accepted: number;
  rejected: number;
}

export interface DailyDataPoint {
  date: string;
  leads: number;
  acceptanceRate: number;
}

export interface GeographicPoint {
  coords: [number, number];
  properties: {
    state: string;
    leads: number;
    acceptanceRate: number;
  };
}

export interface LeadInspectionItem {
  source: string;
  name: string;
  leadId: string;
  formTime: number;
  location: string;
  outcome: 'accepted' | 'rejected' | 'pending';
  flags: string[];
}

export interface DashboardState {
  dateRange: {
    start: string;
    end: string;
  };
  selectedSource?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  status: 'Accepted' | 'Rejected' | 'Pending';
  formTime: number;
  qualityScore: number;
}

export interface LeadSample {
  formTime: number;
  qualityScore: number;
  priority: number;
  data: Record<string, string | number>;
}