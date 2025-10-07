import { useEffect, useState } from 'react';
import { Briefcase, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { parseApplicationLog } from '../lib/csvParser';

function Dashboard() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    successful: 0,
    pending: 0,
    todayApplications: 0,
  });
  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    const applications = await parseApplicationLog();

    const today = new Date().toDateString();
    const todayApps = applications.filter(
      app => new Date(app.appliedAt).toDateString() === today
    );

    setStats({
      totalApplications: applications.length,
      successful: applications.filter(app => app.status === 'success').length,
      pending: applications.filter(app => app.status === 'pending').length,
      todayApplications: todayApps.length,
    });

    setRecentApplications(applications.slice(0, 5));
  }

  const statCards = [
    {
      icon: Briefcase,
      label: 'Total Applications',
      value: stats.totalApplications,
      color: '#3b82f6',
    },
    {
      icon: CheckCircle,
      label: 'Successful',
      value: stats.successful,
      color: '#10b981',
    },
    {
      icon: Clock,
      label: 'Today',
      value: stats.todayApplications,
      color: '#f59e0b',
    },
    {
      icon: TrendingUp,
      label: 'Success Rate',
      value: stats.totalApplications > 0
        ? `${Math.round((stats.successful / stats.totalApplications) * 100)}%`
        : '0%',
      color: '#8b5cf6',
    },
  ];

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
          Dashboard
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          Overview of your LinkedIn job application automation
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '32px',
      }}>
        {statCards.map((stat, index) => (
          <div
            key={index}
            style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500' }}>
                {stat.label}
              </span>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: `${stat.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <stat.icon size={20} color={stat.color} />
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: stat.color }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '12px',
        padding: '24px',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
          Recent Applications
        </h2>

        {recentApplications.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px 0' }}>
            No applications yet. Start the automation to see results here.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentApplications.map((app) => (
              <div
                key={app.id}
                style={{
                  background: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                    {app.jobTitle}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '14px' }}>
                    {app.company} • {app.location}
                  </p>
                </div>
                <div style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: app.status === 'success' ? '#10b98120' : '#f59e0b20',
                  color: app.status === 'success' ? '#10b981' : '#f59e0b',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'capitalize',
                }}>
                  {app.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
