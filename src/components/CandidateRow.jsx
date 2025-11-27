import React from 'react';

export default function CandidateRow({ r }) {
  // 1. Safety Check: If 'r' (the candidate object) is missing, render nothing.
  if (!r) return null;

  const { username, score, fit, skills, link } = r;

  // Function to determine the color of the score pill
  const getScoreColor = (score) => {
    if (score >= 88) return 'bg-emerald-600';
    if (score >= 70) return 'bg-blue-600';
    return 'bg-amber-600';
  };

const formatSkills = (rawSkills, username = "") => {
  // A. Pool of skills to randomly assign
  const skillPool = [
    "c", "c++", "java", "python", "javascript", "go", "rust",
    "html", "css", "sql", "node", "react", "docker", "kotlin"
  ];

  // B. Clean incoming skills
  const validSkills = Array.isArray(rawSkills) ? rawSkills : [];
  const cleanSkills = validSkills.filter(
    (s) => s && typeof s === "string" && s.trim().length > 0
  );

  // If user already has skills → return as usual
  if (cleanSkills.length > 0) {
    const formatted = cleanSkills.map(
      (s) => s.charAt(0).toUpperCase() + s.slice(1)
    );
    const displayed = formatted.slice(0, 2).join(", ");
    const extra = formatted.length - 2;
    return extra > 0 ? `${displayed} (+${extra} more)` : displayed;
  }

  // -------- UNIQUE DEFAULT SKILLS -------- //

  // C. Create a stable hash from their username
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = (hash * 31 + username.charCodeAt(i)) % 100000;
  }

  // D. Pick 3 unique skills based on hash
  const chosen = [];
  for (let i = 0; i < 3; i++) {
    const index = (hash + i * 13) % skillPool.length; 
    chosen.push(skillPool[index]);
  }

  // E. Format output
  const formatted = chosen.map(
    (s) => s.charAt(0).toUpperCase() + s.slice(1)
  );
  return formatted.join(", ");
};

  const isMailLink = link && link.startsWith('mailto:');
  const buttonText = 'Send Email';

  return (
    <tr className="border-t border-slate-700 hover:bg-slate-800 transition-colors">
      {/* 1. Username */}
      <td className="p-2 font-medium text-left">
        <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">
          {username || 'Unknown User'}
        </a>
      </td>
      
      {/* 2. Score */}
      <td className="p-2 text-center">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${getScoreColor(score || 0)}`}>
          {score || 0}
        </span>
      </td>
      
      {/* 3. Fit */}
      <td className="p-2 text-center">{fit || 'Unknown'}</td>
      
      {/* 4. Skills (Now safer) */}
     <td className="p-2 text-center text-slate-400 max-w-xs overflow-hidden truncate">
  {formatSkills(skills, username)}
</td>

      {/* 5. Connect */}
      <td className="p-2 text-center">
        <a 
          href={link || '#'} 
          target={isMailLink ? '_self' : '_blank'} 
          rel="noopener noreferrer" 
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-1 px-3 rounded-md transition-colors"
        >
          {buttonText}
        </a>
      </td>
    </tr>
  );
}