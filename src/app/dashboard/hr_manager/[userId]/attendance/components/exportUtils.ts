export interface ExportRow {
  name: string;
  department: string;
  shift: string;
  status: string;
  punchIn: string;
  punchOut: string;
  workingHours: string;
}

export const ATTENDANCE_EXPORT_ROWS: ExportRow[] = [
  { name: 'Rahul Sharma', department: 'Real Estate', shift: 'General', status: 'Present', punchIn: '09:01', punchOut: '-', workingHours: '4h 32m' },
  { name: 'Priya Patel', department: 'Hotels', shift: 'General', status: 'Present', punchIn: '08:55', punchOut: '-', workingHours: '4h 38m' },
  { name: 'Sneha Gupta', department: 'Corporate HO', shift: 'General', status: 'Late', punchIn: '09:18', punchOut: '-', workingHours: '4h 15m' },
  { name: 'Vikram Rao', department: 'Real Estate', shift: 'Morning', status: 'On Break', punchIn: '06:02', punchOut: '-', workingHours: '7h 28m' },
  { name: 'Amit Kumar', department: 'Saree Manufacturing', shift: 'General', status: 'Absent', punchIn: '-', punchOut: '-', workingHours: '0h 00m' },
  { name: 'Neha Desai', department: 'Hotels', shift: 'General', status: 'Offline', punchIn: '08:48', punchOut: '17:45', workingHours: '8h 57m' },
  { name: 'Rajesh Mehta', department: 'Saree Manufacturing', shift: 'Evening', status: 'Late', punchIn: '14:22', punchOut: '-', workingHours: '2h 08m' },
  { name: 'Anita Joshi', department: 'Corporate HO', shift: 'General', status: 'Present', punchIn: '08:58', punchOut: '-', workingHours: '4h 35m' },
];

export function downloadCSV(rows: ExportRow[], filename = 'attendance.csv') {
  const headers = ['Name', 'Department', 'Shift', 'Status', 'Punch In', 'Punch Out', 'Working Hours'];
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const csv = [
    headers.join(','),
    ...rows.map((r) => [r.name, r.department, r.shift, r.status, r.punchIn, r.punchOut, r.workingHours].map(escape).join(',')),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportToPDF(rows: ExportRow[], title = 'Attendance Report') {
  const date = new Date().toLocaleDateString();
  const html = `<!doctype html><html><head><meta charset="utf-8"/><title>${title}</title>
<style>
  body{font-family:-apple-system,Segoe UI,Roboto,sans-serif;padding:24px;color:#111}
  h1{font-size:20px;margin:0 0 4px}
  .meta{color:#666;font-size:12px;margin-bottom:16px}
  table{width:100%;border-collapse:collapse;font-size:12px}
  th,td{border:1px solid #ddd;padding:8px;text-align:left}
  th{background:#f5f5f5;font-weight:600}
  .Present{color:#16a34a;font-weight:600}
  .Late{color:#d97706;font-weight:600}
  .Absent{color:#dc2626;font-weight:600}
  .Offline{color:#525252;font-weight:600}
  .On.Break,.OnBreak{color:#2563eb;font-weight:600}
  @media print{button{display:none}}
</style></head><body>
<h1>${title}</h1>
<div class="meta">Generated on ${date} · ${rows.length} records</div>
<table><thead><tr><th>Name</th><th>Department</th><th>Shift</th><th>Status</th><th>Punch In</th><th>Punch Out</th><th>Hours</th></tr></thead>
<tbody>
${rows.map((r) => `<tr><td>${r.name}</td><td>${r.department}</td><td>${r.shift}</td><td class="${r.status.replace(/\s/g, '')}">${r.status}</td><td>${r.punchIn}</td><td>${r.punchOut}</td><td>${r.workingHours}</td></tr>`).join('')}
</tbody></table>
<script>window.onload=()=>{window.print();}</script>
</body></html>`;

  const w = window.open('', '_blank', 'width=900,height=700');
  if (!w) return;
  w.document.write(html);
  w.document.close();
}
