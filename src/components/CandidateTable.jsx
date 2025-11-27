// CandidateTable.jsx
import CandidateRow from "./CandidateRow";

export default function CandidateTable({ results }) {
  // Defensive check to ensure results is an array before mapping (fixes TypeError)
  const candidateResults = Array.isArray(results) ? results : [];

  return (
    <div className="glass-card p-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-slate-400">
          <tr>
            <th className="p-2 text-left">Username</th>
            <th className="p-2">Score</th>
            <th className="p-2">Fit</th>
            <th className="p-2">Skills</th>
            <th className="p-2">Connect</th>
          </tr>
        </thead>
        <tbody className="text-slate-200">
          {candidateResults.map((r) => (
            // Ensure key is provided
            <CandidateRow key={r.username} r={r} /> 
          ))}
        </tbody>
      </table>
    </div>
  );
}