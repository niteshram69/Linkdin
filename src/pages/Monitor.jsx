import { useState } from 'react';
import { Play, Pause, RefreshCw, CircleAlert as AlertCircle, CircleCheck as CheckCircle2 } from 'lucide-react';

function Monitor() {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([
    { id: 1, type: 'info', message: 'Automation system initialized', timestamp: new Date() },
    { id: 2, type: 'info', message: 'Ready to start job application automation', timestamp: new Date() },
  ]);

  function handleStart() {
    setIsRunning(true);
    addLog('success', 'Automation started');
    addLog('info', 'Logging into LinkedIn...');

    setTimeout(() => {
      addLog('success', 'Successfully logged in');
      addLog('info', 'Searching for matching jobs...');
    }, 2000);

    setTimeout(() => {
      addLog('info', 'Found 25 matching jobs');
      addLog('info', 'Starting application process...');
    }, 4000);
  }

  function handleStop() {
    setIsRunning(false);
    addLog('warning', 'Automation stopped by user');
  }

  function handleReset() {
    setLogs([
      { id: 1, type: 'info', message: 'Automation system initialized', timestamp: new Date() },
      { id: 2, type: 'info', message: 'Ready to start job application automation', timestamp: new Date() },
    ]);
  }

  function addLog(type, message) {
    const newLog = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date(),
    };
    setLogs(prev => [...prev, newLog]);
  }

  const getLogColor = (type) => {
    switch (type) {
      case 'success':
        return '#10b981';
      case 'error':
        return '#ef4444';
      case 'warning':
        return '#f59e0b';
      default:
        return '#64748b';
    }
  };

  const getLogIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={16} />;
      case 'error':
        return <AlertCircle size={16} />;
      case 'warning':
        return <AlertCircle size={16} />;
      default:
        return <RefreshCw size={16} />;
    }
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
          Monitor
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          Real-time monitoring of automation activity
        </p>
      </div>

      <div style={{
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              Automation Status
            </h2>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: isRunning ? '#10b981' : '#64748b',
                animation: isRunning ? 'pulse 2s infinite' : 'none',
              }} />
              <span style={{
                fontSize: '14px',
                color: isRunning ? '#10b981' : '#64748b',
                fontWeight: '500',
              }}>
                {isRunning ? 'Running' : 'Idle'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            {!isRunning ? (
              <button
                onClick={handleStart}
                style={{
                  padding: '12px 24px',
                  background: '#10b981',
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
                <Play size={18} />
                Start Automation
              </button>
            ) : (
              <button
                onClick={handleStop}
                style={{
                  padding: '12px 24px',
                  background: '#ef4444',
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
                <Pause size={18} />
                Stop Automation
              </button>
            )}

            <button
              onClick={handleReset}
              style={{
                padding: '12px 24px',
                background: '#334155',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#e2e8f0',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
              }}
            >
              <RefreshCw size={18} />
              Clear Logs
            </button>
          </div>
        </div>

        <div style={{
          background: '#0f172a',
          border: '1px solid #334155',
          borderRadius: '8px',
          padding: '16px',
          minHeight: '400px',
          maxHeight: '500px',
          overflowY: 'auto',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontFamily: 'monospace',
            fontSize: '13px',
          }}>
            {logs.map((log) => (
              <div
                key={log.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ color: '#64748b', minWidth: '80px' }}>
                  {log.timestamp.toLocaleTimeString()}
                </span>
                <div style={{
                  color: getLogColor(log.type),
                  display: 'flex',
                  alignItems: 'center',
                  minWidth: '20px',
                }}>
                  {getLogIcon(log.type)}
                </div>
                <span style={{ color: '#e2e8f0', flex: 1 }}>
                  {log.message}
                </span>
              </div>
            ))}

            {isRunning && (
              <div style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                color: '#64748b',
              }}>
                <span style={{ minWidth: '80px' }}>
                  {new Date().toLocaleTimeString()}
                </span>
                <div className="loading-dots">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{
        background: '#1e40af',
        border: '1px solid #2563eb',
        borderRadius: '12px',
        padding: '16px',
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
            Note
          </h3>
          <p style={{ fontSize: '13px', color: '#bfdbfe', lineHeight: '1.5' }}>
            This is a preview interface. To run the actual automation, execute the Python script
            from the command line: <code style={{
              background: '#1e40af',
              padding: '2px 6px',
              borderRadius: '4px',
              fontFamily: 'monospace',
            }}>python Linkdin_Automation_Project.py</code>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .loading-dots span {
          animation: blink 1.4s infinite;
          animation-fill-mode: both;
        }

        .loading-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .loading-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes blink {
          0%, 80%, 100% {
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Monitor;
