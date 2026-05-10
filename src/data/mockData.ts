import csvRaw from '../../assignment.csv?raw';
import { LeadSource, DailyDataPoint, LeadInspectionItem, Lead, LeadSample } from '../types';

interface RawRow {
  lead_id: string;
  lead_name: string;
  source: string;
  timestamp: string;
  form_completion_time_sec: string;
  state: string;
  pincode: string;
  phone_number: string;
  carrier_acceptance_status: string;
}

const parseCSV = (raw: string): RawRow[] => {
  const lines = raw.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = (values[i] || '').trim(); });
    return row as RawRow;
  });
};

const parseDate = (timestamp: string): string => {
  const [datePart] = timestamp.split(' ');
  const [day, month, year] = datePart.split('-');
  return `${year}-${month}-${day}`;
};

const computeQualityScore = (status: string, formTime: number | null): number => {
  let base = status === 'Accepted' ? 78 : status === 'Pending' ? 52 : 30;
  if (formTime === null) base -= 10;
  else if (formTime < 10) base -= 25;
  else if (formTime >= 60 && formTime <= 240) base += 10;
  return Math.max(0, Math.min(100, base));
};

export const generateMockData = () => {
  const rows = parseCSV(csvRaw);

  // Leads
  const leads: Lead[] = rows.map(row => {
    const formTime = row.form_completion_time_sec ? parseFloat(row.form_completion_time_sec) : null;
    const nameParts = row.lead_name.toLowerCase().split(' ');
    return {
      id: row.lead_id,
      name: row.lead_name,
      email: `${nameParts.join('.')}@example.com`,
      source: row.source,
      status: row.carrier_acceptance_status as Lead['status'],
      formTime: formTime !== null ? Math.round(formTime) : 0,
      qualityScore: computeQualityScore(row.carrier_acceptance_status, formTime),
    };
  });

  // Sources — aggregate by source name
  const sourceMap = new Map<string, {
    accepted: number; rejected: number; pending: number;
    formTimes: number[]; geoDistribution: Record<string, number>;
  }>();

  rows.forEach(row => {
    if (!sourceMap.has(row.source)) {
      sourceMap.set(row.source, { accepted: 0, rejected: 0, pending: 0, formTimes: [], geoDistribution: {} });
    }
    const s = sourceMap.get(row.source)!;
    if (row.carrier_acceptance_status === 'Accepted') s.accepted++;
    else if (row.carrier_acceptance_status === 'Rejected') s.rejected++;
    else s.pending++;

    if (row.form_completion_time_sec) {
      s.formTimes.push(parseFloat(row.form_completion_time_sec));
    }
    const state = row.state || 'Unknown';
    s.geoDistribution[state] = (s.geoDistribution[state] || 0) + 1;
  });

  const sources: LeadSource[] = Array.from(sourceMap.entries()).map(([name, data]) => ({
    id: name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
    name,
    leadsTotal: data.accepted + data.rejected + data.pending,
    accepted: data.accepted,
    rejected: data.rejected,
    pending: data.pending,
    avgFormTime: data.formTimes.length
      ? Math.round(data.formTimes.reduce((a, b) => a + b, 0) / data.formTimes.length)
      : 0,
    geoDistribution: data.geoDistribution,
  }));

  // Daily data — aggregate by date
  const dailyMap = new Map<string, { total: number; accepted: number }>();

  rows.forEach(row => {
    if (!row.timestamp) return;
    const date = parseDate(row.timestamp);
    if (!dailyMap.has(date)) dailyMap.set(date, { total: 0, accepted: 0 });
    const d = dailyMap.get(date)!;
    d.total++;
    if (row.carrier_acceptance_status === 'Accepted') d.accepted++;
  });

  const dailyData: DailyDataPoint[] = Array.from(dailyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, data]) => ({
      date,
      leads: data.total,
      acceptanceRate: data.total > 0
        ? parseFloat(((data.accepted / data.total) * 100).toFixed(1))
        : 0,
    }));

  // Inspection items — first 50 rows
  const inspectionItems: LeadInspectionItem[] = rows.slice(0, 50).map(row => {
    const formTime = row.form_completion_time_sec ? parseFloat(row.form_completion_time_sec) : 0;
    const flags: string[] = [];
    if (!row.form_completion_time_sec) flags.push('incomplete');
    if (formTime > 0 && formTime < 10) flags.push('suspicious');
    if (row.carrier_acceptance_status === 'Rejected') flags.push('rejected');
    return {
      source: row.source,
      name: row.lead_name,
      leadId: row.lead_id,
      formTime: Math.round(formTime),
      location: row.state || 'Unknown',
      outcome: row.carrier_acceptance_status.toLowerCase() as LeadInspectionItem['outcome'],
      flags,
    };
  });

  // Lead sample — first accepted row with a form time
  const sampleRow = rows.find(r => r.carrier_acceptance_status === 'Accepted' && r.form_completion_time_sec);
  const leadSample: LeadSample = sampleRow ? {
    formTime: Math.round(parseFloat(sampleRow.form_completion_time_sec)),
    qualityScore: computeQualityScore('Accepted', parseFloat(sampleRow.form_completion_time_sec)),
    priority: 75,
    data: {
      name: sampleRow.lead_name,
      source: sampleRow.source,
      location: sampleRow.state,
      phone: sampleRow.phone_number,
    },
  } : {
    formTime: 154,
    qualityScore: 82,
    priority: 75,
    data: { name: 'Nikhil Agarwal', source: 'PolicyBazaar_Direct', location: 'Telangana', phone: '9964411347' },
  };

  return { sources, dailyData, inspectionItems, leads, leadSample };
};

export const mockData = generateMockData();

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatDuration = (seconds: number) => {
  const rounded = Math.round(seconds);
  const mins = Math.floor(rounded / 60);
  const secs = rounded % 60;
  return `${mins}m ${secs}s`;
};
