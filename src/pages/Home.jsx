import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Github,
  Star,
  Code2,
  CheckCircle2,
  Loader2,
  Activity,
  Sparkles
} from "lucide-react";

const EXAMPLE_USERS = ["vercel", "octocat", "sindresorhus"];
export default function Home() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | error | loaded
  const [error, setError] = useState("");

  async function runAnalysis(name) {
    if (!name) {
      setError("Please enter a GitHub username.");
      return;
    }

    setStatus("loading");
    setError("");
    setResult(null);
    try {
      const res = await axios.get(
        `https://server-sable-ten-44.vercel.app/api/analyze/${name.trim()}`
      );
      setResult(res.data);
      setStatus("loaded");
    } catch (err) {
      setStatus("error");
      setError(
        err?.response?.data?.error ||
          "Failed to analyze GitHub profile. Please try again."
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    runAnalysis(username.trim());
  }

  function handleExample(u) {
    setUsername(u);
    runAnalysis(u);
  }

  const score =
    result?.profile?.workability_score?.score != null
      ? result.profile.workability_score.score
      : null;

  return (
    <>
      {/* Background glow */}
      <div className="app-bg" />

      <div className="min-h-[calc(100vh-96px)] flex flex-col items-center justify-center py-10">
        {/* HERO + INPUT */}
        <motion.div
          className="w-full max-w-5xl space-y-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Hero */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
            {/* Left content */}
            <div className="space-y-6">
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AI-powered workability analysis for GitHub developers
              </motion.div>

              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
                  Turn a{" "}
                  <span className="gradient-text">
                    GitHub username
                  </span>{" "}
                  into a hiring-ready profile.
                </h1>
                <p className="text-sm sm:text-base text-slate-400 max-w-xl">
                  Workability extracts real signals from repositories, commit
                  patterns and languages to infer skills, experience level, work
                  style and top role fits in seconds.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-2 text-[11px] text-slate-400"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="badge border-sky-500/40 bg-sky-500/10">
                  <Activity size={12} className="mr-1" />
                  Uses real GitHub activity
                </span>
                <span className="badge border-indigo-500/40 bg-indigo-500/10">
                  <Sparkles size={12} className="mr-1" />
                  AI / mock-backed scoring
                </span>
                <span className="badge border-emerald-500/40 bg-emerald-500/10">
                  No GitHub login required
                </span>
              </motion.div>

              <motion.div
                className="space-y-2 text-xs text-slate-500"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <p className="font-medium text-slate-300">
                  Try with sample profiles:
                </p>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLE_USERS.map((u, i) => (
                    <motion.button
                      key={u}
                      onClick={() => handleExample(u)}
                      className="badge hover:bg-white/10 hover:border-white/20 transition cursor-pointer"
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97, y: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    >
                      <Github size={12} className="mr-1" /> @{u}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Input card */}
            <motion.div
              className="glass-card p-6 sm:p-7"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <label
                      htmlFor="username"
                      className="text-sm font-medium text-slate-200"
                    >
                      GitHub username
                    </label>
                    <span className="text-[11px] text-slate-500">
                      We only read public data
                    </span>
                  </div>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                      github.com/
                    </span>
                    <input
                      id="username"
                      type="text"
                      autoComplete="off"
                      placeholder="your-handle"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 pl-28 pr-3 text-sm text-white outline-none ring-0 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40 transition placeholder:text-slate-600"
                    />
                  </div>

                  {error && status === "error" && (
                    <p className="text-xs text-rose-400 mt-1">{error}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 py-2.5 text-sm font-medium text-slate-950 shadow-[0_12px_35px_rgba(56,189,248,0.45)] hover:brightness-110 active:scale-[0.99] transition flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Analyzing…
                    </>
                  ) : (
                    <>
                      Analyze profile <Github size={14} />
                    </>
                  )}
                </motion.button>

                <div className="dashed-divider my-1" />

                <div className="flex items-start gap-3 text-[11px] text-slate-500">
                  <span className="mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-600 text-[10px]">
                    i
                  </span>
                  <p>
                    Best results with developers who have at least 3–5 public
                    repositories and some activity in the last few months.
                  </p>
                </div>
              </form>
            </motion.div>
            {/* GO TO JOBS BUTTON */}
<motion.div
  className="flex justify-center mt-6"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.35 }}
>
  <button
    onClick={() => window.location.href = "/jobs"}
    className="rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2.5 text-sm font-medium text-white shadow-lg backdrop-blur-lg transition-all flex items-center gap-2"
  >
    <Briefcase size={16} className="text-emerald-300" />
    View Job Portal
  </button>
</motion.div>

          </div>
        </motion.div>

        {/* RESULTS AREA */}
        <AnimatePresence mode="wait">
          {status === "loading" && (
            <motion.div
              key="loading"
              className="mt-10 flex flex-col items-center gap-3 text-slate-400"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}
            >
              <Loader2 className="w-8 h-8 animate-spin" />
              <p>Fetching GitHub profile, repositories and commit patterns…</p>
            </motion.div>
          )}

          {status === "loaded" && result && (
            <motion.div
              key="results"
              className="w-full max-w-5xl mt-10 space-y-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Top row: summary + score */}
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                {/* Summary */}
                <motion.div
                  className="glass-card p-5 sm:p-6 space-y-4"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="section-title mb-1">
                        GitHub signals summary
                      </p>
                      <h2 className="text-lg font-semibold">
                        @{result.username}
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                      <span className="badge bg-white/5 border-white/10">
                        {result.signals.repo_count} public repos
                      </span>
                      <span className="badge bg-white/5 border-white/10">
                        {result.signals.stars_total} stars
                      </span>
                      <span className="badge bg-white/5 border-white/10">
                        {result.signals.recent_commit_velocity} commits (30d)
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 text-xs">
                    <div className="rounded-xl bg-black/40 border border-white/5 p-3">
                      <p className="text-slate-400 mb-1">
                        Active days (last 30d)
                      </p>
                      <p className="text-2xl font-semibold">
                        {result.signals.active_days}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Days with at least one commit
                      </p>
                    </div>
                    <div className="rounded-xl bg-black/40 border border-white/5 p-3">
                      <p className="text-slate-400 mb-1">Project types</p>
                      <p className="text-[11px] text-slate-300">
                        {result.signals.project_types.length > 0
                          ? result.signals.project_types.join(" · ")
                          : "No specific domains detected yet"}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Score */}
                <motion.div
                  className="glass-card p-5 sm:p-6 flex flex-col md:flex-row items-center gap-5"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="relative">
                    <motion.div
                      className="h-28 w-28 rounded-full border border-white/10 flex items-center justify-center bg-black/40"
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 160 }}
                    >
                      <div className="relative z-10 text-center">
                        <p className="text-[11px] text-slate-400">Score</p>
                        <motion.p
                          className="text-3xl font-semibold text-emerald-400"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.25 }}
                        >
                          {score}
                        </motion.p>
                        <p className="text-[10px] text-slate-500">/ 100</p>
                      </div>
                      <motion.div
                        className="absolute inset-[-4px] rounded-full border border-transparent"
                        style={{
                          background:
                            "conic-gradient(from 140deg, rgba(56,189,248,0.9) 0deg, rgba(52,211,153,0.9) 120deg, transparent 120deg)"
                        }}
                        initial={{ rotate: -60, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      />
                    </motion.div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="section-title">Workability score</p>
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-sm text-slate-200">
                      {result.profile.workability_score.rationale}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Blend of repo quality, activity, collaboration and language
                      depth based on your GitHub history.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Languages + Strengths + Roles */}
              <div className="grid gap-5 lg:grid-cols-3">
                {/* Languages */}
                <motion.div
                  className="glass-card p-4 sm:p-5 space-y-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <p className="section-title">Languages</p>
                  <h3 className="text-sm font-semibold text-slate-100">
                    Primary languages by code volume
                  </h3>
                  <div className="space-y-3 mt-2">
                    {result.signals.primary_languages.length === 0 && (
                      <p className="text-xs text-slate-500">
                        No language breakdown available yet.
                      </p>
                    )}
                    {result.signals.primary_languages.map((lang, i) => (
                      <motion.div
                        key={lang.name}
                        className="space-y-1"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.18 + i * 0.05 }}
                      >
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-200">{lang.name}</span>
                          <span className="text-slate-400">
                            {lang.percentage.toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${lang.percentage}%` }}
                            transition={{ duration: 0.8, delay: 0.18 + i * 0.05 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Skills */}
                <motion.div
                  className="glass-card p-4 sm:p-5 space-y-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="section-title">Skills</p>
                  <h3 className="text-sm font-semibold text-slate-100">
                    What this profile seems good at
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {result.profile.skills.map((s, i) => (
                      <motion.span
                        key={`${s.skill}-${i}`}
                        className="badge bg-white/5 border-white/10"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.22 + i * 0.04 }}
                      >
                        {s.skill}
                        <span className="text-slate-400 text-[10px] ml-1">
                          ({s.confidence})
                        </span>
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Role fits */}
                <motion.div
                  className="glass-card p-4 sm:p-5 space-y-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <p className="section-title">Top roles</p>
                  <h3 className="text-sm font-semibold text-slate-100">
                    Where this developer may excel
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {result.profile.role_fits.map((role, i) => (
                      <motion.span
                        key={`${role}-${i}`}
                        className="badge bg-indigo-500/10 border-indigo-500/30 text-indigo-200"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.28 + i * 0.04 }}
                      >
                        {role}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Work style + Evidence */}
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)]">
                {/* Work Style */}
                <motion.div
                  className="glass-card p-4 sm:p-5 space-y-3"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="section-title">Work style</p>
                  <h3 className="text-sm font-semibold text-slate-100">
                    How they tend to work
                  </h3>
                  <div className="space-y-2 mt-2">
                    {result.profile.work_style.map((w, i) => (
                      <motion.div
                        key={`${w.trait}-${i}`}
                        className="rounded-xl bg-black/40 border border-white/5 px-3 py-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.32 + i * 0.05 }}
                      >
                        <p className="text-xs font-semibold text-slate-100">
                          {w.trait}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          {w.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Evidence */}
                <motion.div
                  className="glass-card p-4 sm:p-5 space-y-3"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34 }}
                >
                  <p className="section-title">Evidence</p>
                  <h3 className="text-sm font-semibold text-slate-100">
                    Why this profile was rated this way
                  </h3>
                  <ul className="space-y-2 mt-2 text-xs text-slate-200">
                    {result.profile.real_work_evidence.map((ev, i) => (
                      <motion.li
                        key={i}
                        className="flex gap-2 rounded-xl bg-black/40 border border-white/5 px-3 py-2"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.36 + i * 0.05 }}
                      >
                        <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-sky-400" />
                        <span>{ev}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
