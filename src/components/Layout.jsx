import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, Activity } from 'lucide-react';

function Layout({ children }) {
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/applications', icon: FileText, label: 'Applications' },
    { path: '/monitor', icon: Activity, label: 'Monitor' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <nav style={{
        width: '250px',
        background: '#1e293b',
        borderRight: '1px solid #334155',
        padding: '24px 0',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          padding: '0 24px',
          marginBottom: '48px',
        }}>
          <h1 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <Activity size={24} />
            Job Automation
          </h1>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                color: isActive ? '#3b82f6' : '#94a3b8',
                background: isActive ? '#1e40af1a' : 'transparent',
                borderRight: isActive ? '3px solid #3b82f6' : '3px solid transparent',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s',
              })}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main style={{
        flex: 1,
        overflow: 'auto',
        background: '#0f172a',
      }}>
        {children}
      </main>
    </div>
  );
}

export default Layout;
