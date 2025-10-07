import { useState, useEffect } from 'react';
import { Save, Eye, EyeOff, FileText } from 'lucide-react';

function Settings() {
  const [settings, setSettings] = useState({
    linkedinEmail: '',
    linkedinPassword: '',
    jobTitle: '',
    location: '',
    maxJobsPerRun: '50',
    resumePath: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('automation-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  function handleChange(field, value) {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
    setSaved(false);
  }

  function handleSave() {
    localStorage.setItem('automation-settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputStyle = {
    width: '100%',
    padding: '12px',
    background: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#e2e8f0',
  };

  return (
    <div style={{ padding: '32px', maxWidth: '800px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
          Settings
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          Configure your LinkedIn automation preferences
        </p>
      </div>

      <div style={{
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>
          LinkedIn Credentials
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={settings.linkedinEmail}
              onChange={(e) => handleChange('linkedinEmail', e.target.value)}
              placeholder="your.email@example.com"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={settings.linkedinPassword}
                onChange={(e) => handleChange('linkedinPassword', e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>
          Job Preferences
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={labelStyle}>Target Job Title</label>
            <input
              type="text"
              value={settings.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              placeholder="e.g., Software Engineer, Data Analyst"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Preferred Location</label>
            <input
              type="text"
              value={settings.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="e.g., San Francisco, Remote"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Max Jobs Per Run</label>
            <input
              type="number"
              value={settings.maxJobsPerRun}
              onChange={(e) => handleChange('maxJobsPerRun', e.target.value)}
              min="1"
              max="100"
              style={inputStyle}
            />
            <p style={{ marginTop: '6px', fontSize: '12px', color: '#64748b' }}>
              Maximum number of jobs to apply to in a single automation run
            </p>
          </div>
        </div>
      </div>

      <div style={{
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>
          Resume
        </h2>

        <div>
          <label style={labelStyle}>Resume Path</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              value={settings.resumePath}
              onChange={(e) => handleChange('resumePath', e.target.value)}
              placeholder="/path/to/your/resume.pdf"
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              style={{
                padding: '12px 20px',
                background: '#334155',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#e2e8f0',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
              }}
            >
              <FileText size={18} />
              Browse
            </button>
          </div>
          <p style={{ marginTop: '6px', fontSize: '12px', color: '#64748b' }}>
            Provide the full path to your resume file
          </p>
        </div>
      </div>

      <div style={{
        background: '#1e40af',
        border: '1px solid #2563eb',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '24px',
        display: 'flex',
        gap: '12px',
      }}>
        <div style={{
          width: '6px',
          borderRadius: '3px',
          background: '#3b82f6',
          flexShrink: 0,
        }} />
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
            Security Note
          </h3>
          <p style={{ fontSize: '13px', color: '#bfdbfe', lineHeight: '1.5' }}>
            Your credentials are stored locally in your browser. For production use,
            consider using environment variables or secure credential management.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <button
          onClick={handleSave}
          style={{
            padding: '12px 24px',
            background: saved ? '#10b981' : '#3b82f6',
            border: 'none',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s',
          }}
        >
          <Save size={18} />
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}

export default Settings;
