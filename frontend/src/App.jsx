import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [findings, setFindings] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/results')
      .then((res) => res.json())
      .then((data) => {
        // If the data is an array, use it directly. If it's a single object, wrap it.
        const parsed = Array.isArray(data) ? data : [data];
        setFindings(parsed);
      })
      .catch((err) => console.error('Error fetching results:', err));
  }, []);

  const getSeverityClass = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'low':
        return 'badge severity-low';
      case 'medium':
        return 'badge severity-medium';
      case 'high':
        return 'badge severity-high';
      case 'critical':
        return 'badge severity-critical';
      default:
        return 'badge severity-info';
    }
  };

  return (
    <div className="App">
      <header>
        <h1>🔍 VulnWatch CI Dashboard</h1>
        <p>Continuous vulnerability insights at a glance</p>
      </header>
      <main>
        {findings.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Template</th>
                <th>Severity</th>
                <th>Host</th>
                <th>Matched At</th>
              </tr>
            </thead>
            <tbody>
              {findings.map((finding, idx) => (
                <tr key={idx}>
                  <td>{finding.template || 'N/A'}</td>
                  <td>
                    <span className={getSeverityClass(finding.info?.severity)}>
                      {finding.info?.severity || 'unknown'}
                    </span>
                  </td>
                  <td>{finding.host || 'N/A'}</td>
                  <td>{finding['matched-at'] || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-results">No findings found.</div>
        )}
      </main>
    </div>
  );
}

export default App;
