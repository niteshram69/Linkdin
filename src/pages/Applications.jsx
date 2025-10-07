import { useEffect, useState } from 'react';
import { Search, Filter, ExternalLink } from 'lucide-react';
import { parseApplicationLog } from '../lib/csvParser';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [searchTerm, filterStatus, applications]);

  async function loadApplications() {
    const apps = await parseApplicationLog();
    setApplications(apps);
    setFilteredApplications(apps);
  }

  function filterApplications() {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(app => app.status === filterStatus);
    }

    setFilteredApplications(filtered);
  }

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
          Applications
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          View and manage all your job applications
        </p>
      </div>

      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap',
      }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
          <Search
            size={20}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#64748b',
            }}
          />
          <input
            type="text"
            placeholder="Search by job title, company, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 12px 12px 44px',
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#e2e8f0',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ position: 'relative', minWidth: '200px' }}>
          <Filter
            size={20}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#64748b',
            }}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 12px 12px 44px',
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#e2e8f0',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="all">All Status</option>
            <option value="success">Successful</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div style={{
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '12px',
        overflow: 'hidden',
      }}>
        {filteredApplications.length === 0 ? (
          <div style={{
            padding: '60px',
            textAlign: 'center',
            color: '#94a3b8',
          }}>
            <p style={{ fontSize: '16px', marginBottom: '8px' }}>
              No applications found
            </p>
            <p style={{ fontSize: '14px' }}>
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your filters'
                : 'Start the automation to see applications here'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
            }}>
              <thead>
                <tr style={{
                  background: '#0f172a',
                  borderBottom: '1px solid #334155',
                }}>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                  }}>
                    Job Title
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                  }}>
                    Company
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                  }}>
                    Location
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                  }}>
                    Status
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                  }}>
                    Applied
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    style={{
                      borderBottom: '1px solid #334155',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#0f172a'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '16px' }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#e2e8f0',
                        marginBottom: '4px',
                      }}>
                        {app.jobTitle}
                      </div>
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#94a3b8' }}>
                      {app.company}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#94a3b8' }}>
                      {app.location}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: app.status === 'success' ? '#10b98120' : '#f59e0b20',
                        color: app.status === 'success' ? '#10b981' : '#f59e0b',
                        fontSize: '12px',
                        fontWeight: '600',
                        textTransform: 'capitalize',
                      }}>
                        {app.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#94a3b8' }}>
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{
        marginTop: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#94a3b8',
        fontSize: '14px',
      }}>
        <span>
          Showing {filteredApplications.length} of {applications.length} applications
        </span>
      </div>
    </div>
  );
}

export default Applications;
