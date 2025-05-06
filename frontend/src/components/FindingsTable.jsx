import React, { useEffect, useState } from 'react';
import './FindingsTable.css';

const severityColors = {
  critical: 'badge-critical',
  high: 'badge-high',
  medium: 'badge-medium',
  low: 'badge-low',
  info: 'badge-info',
};

export default function FindingsTable() {
  const [findings, setFindings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/findings.json')
      .then((res) => res.json())
      .then((data) => {
        setFindings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load findings:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="status-msg">Loading findings...</div>;
  if (!findings.length) return <div className="status-msg">No findings found.</div>;

  return (
    <div className="table-container">
      <h2>Scan Results</h2>
      <table className="findings-table">
        <thead>
          <tr>
            <th>Template Name</th>
            <th>Severity</th>
            <th>Header</th>
            <th>URL</th>
            <th>Matched At</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {findings.map((item, index) => (
            <tr key={index}>
              <td>{item.info?.name}</td>
              <td>
                <span className={`badge ${severityColors[item.info?.severity || 'info']}`}>
                  {item.info?.severity}
                </span>
              </td>
              <td>{item.matcher-name}</td>
              <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
              <td>{item['matched-at']}</td>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
