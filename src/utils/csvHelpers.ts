import Papa from 'papaparse';
import type { Lead } from '../types';

export const exportLeadsToCSV = (leads: Lead[]) => {
  const data = leads.map(lead => ({
    Name: lead.name,
    Email: lead.email,
    Phone: lead.phone,
    Status: lead.status,
    Source: lead.source,
    'Property Interest': lead.property_interest || '',
    Budget: lead.budget || '',
    Location: lead.location || '',
    Notes: lead.notes || '',
    'Last Contact': new Date(lead.last_contact).toLocaleDateString(),
    'Next Follow-up': new Date(lead.next_followup).toLocaleDateString()
  }));

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const parseCSVFile = (file: File): Promise<Partial<Lead>[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const leads = results.data.map((row: any) => ({
          name: row.Name,
          email: row.Email,
          phone: row.Phone,
          status: row.Status?.toLowerCase() || 'new',
          source: row.Source?.toLowerCase() || 'other',
          property_interest: row['Property Interest'],
          budget: row.Budget ? Number(row.Budget) : undefined,
          location: row.Location,
          notes: row.Notes,
          last_contact: new Date().toISOString(),
          next_followup: new Date().toISOString()
        }));
        resolve(leads);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};