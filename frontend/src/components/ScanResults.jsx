import React, { useEffect, useState } from "react";
import "./ScanResults.css";

function ScanResults() {
  const [scanData, setScanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/results")  // ✅ Corrected API path
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch scan results.");
        }
        return res.json();
      })
      .then((data) => {
        setScanData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="scan-results"><p>Loading scan results...</p></div>;
  if (error) return <div className="scan-results"><p>Error: {error}</p></div>;
  if (!scanData || !Array.isArray(scanData.findings)) return <div className="scan-results"><p>No results available.</p></div>;

  const summary = scanData.findings.reduce((acc, item) => {
    acc[item.severity] = (acc[item.severity] || 0) + 1;
    return acc;
  }, {});

  const exportToJson = () => {
    const blob = new Blob([JSON.stringify(scanData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vulnwatch_results.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="scan-results">
      <h2>Scan Results</h2>
      <p><strong>Scan completed:</strong> {scanData.timestamp}</p>
      <div className="summary">
        {["Critical", "High", "Medium", "Low"].map(level => (
          summary[level] && (
            <span key={level} className={`badge ${level.toLowerCase()}`}>
              {level}: {summary[level]}
            </span>
          )
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Severity</th>
            <th>Description</th>
            <th>Target</th>
            <th>Reference</th>
          </tr>
        </thead>
        <tbody>
          {scanData.findings.map((finding, index) => (
            <tr key={index}>
              <td>{finding.id}</td>
              <td><span className={`badge ${finding.severity.toLowerCase()}`}>{finding.severity}</span></td>
              <td>{finding.description}</td>
              <td>{finding.target || "N/A"}</td>
              <td><a href={finding.reference} target="_blank" rel="noopener noreferrer">Link</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="export-btn" onClick={exportToJson}>Export Results to JSON</button>
    </div>
  );
}

export default ScanResults;
