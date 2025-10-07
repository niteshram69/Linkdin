export async function parseApplicationLog() {
  try {
    const response = await fetch('/application_log.csv');
    const text = await response.text();

    const lines = text.split('\n').filter(line => line.trim() && !line.startsWith('---'));

    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim());
    const applications = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);

      if (values.length === headers.length) {
        const app = {};
        headers.forEach((header, index) => {
          app[header] = values[index];
        });

        if (app['Job Title'] && app['Job Title'] !== 'N/A') {
          applications.push({
            id: i,
            jobTitle: app['Job Title'],
            company: app['Company Name'],
            location: app['Location'],
            description: app['Job Description'],
            appliedAt: new Date().toISOString(),
            status: 'success',
          });
        }
      }
    }

    return applications;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
}

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values.map(v => v.replace(/^"|"$/g, ''));
}
