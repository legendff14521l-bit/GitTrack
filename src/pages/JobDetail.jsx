import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { getJob, analyzeCandidates, discoverCandidates } from "../lib/api";
import LoadingSpinner from "../components/loadingspinner";
import ErrorBox from "../components/ErrorBox";
import CandidateUpload from "../components/CandidateUpload";
import CandidateTable from "../components/CandidateTable";

export default function JobDetail() {
  const [, params] = useRoute("/jobs/:id");
  const jobId = params.id;

  const [job, setJob] = useState(null);
  const [state, setState] = useState("loading");

  const [results, setResults] = useState([]);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [discovering, setDiscovering] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  useEffect(() => {
    setState("loading");
    getJob(jobId)
      .then((data) => {
        setJob(data);
        setState("done");
      })
      .catch(() => {
        setState("error");
      });
  }, [jobId]);

  async function handleAnalyze(usernames) {
    try {
      setAnalysisError("");
      setLoadingAnalysis(true);

      const res = await analyzeCandidates(jobId, usernames);
      setResults(res);
    } catch (err) {
      setAnalysisError("Failed to analyze these candidates. Please try again.");
    } finally {
      setLoadingAnalysis(false);
    }
  }

  async function handleDiscover() {
    try {
      setAnalysisError("");
      setDiscovering(true);
      setResults([]); // clear old data

      const res = await discoverCandidates(jobId);

      // Save full 10 results for "View full ranked list"
      localStorage.setItem("discoverResults:" + jobId, JSON.stringify(res));

      setResults(res.slice(0, 10)); // show top 10
    } catch (err) {
      setAnalysisError(
        "Could not discover candidates for this job right now. Please try again later."
      );
    } finally {
      setDiscovering(false);
    }
  }

  if (state === "loading") return <LoadingSpinner />;
  if (state === "error") return <ErrorBox message="Job not found." />;

  return (
    <div className="space-y-8 max-w-4xl mx-auto w-full py-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white tracking-tight">{job.title}</h1>
        <Link href="/jobs" className="text-sm text-slate-400 hover:text-[#7c7aac] transition-colors">
          ← All jobs
        </Link>
      </div>

      {/* Job Overview */}
      <div className="bg-slate-900/40 border border-[#7c7aac]/20 backdrop-blur-sm rounded-2xl p-6 space-y-3">
        <p className="text-xs uppercase tracking-wider font-semibold text-[#7c7aac] mb-2">Role Overview</p>

        <p className="text-slate-300">
          <strong className="text-white font-medium">Seniority:</strong> {job.seniority}
        </p>

        <p className="text-slate-300">
          <strong className="text-white font-medium">Location:</strong> {job.location}
        </p>

        <p className="text-slate-300">
          <strong className="text-white font-medium">Must-have tech:</strong>{" "}
          {job.stackMust?.length ? job.stackMust.join(", ") : "—"}
        </p>

        <p className="text-slate-300">
          <strong className="text-white font-medium">Nice-to-have:</strong>{" "}
          {job.stackNice?.length ? job.stackNice.join(", ") : "—"}
        </p>
      </div>

      {/* Discover Candidates */}
      <div className="bg-slate-900/40 border border-[#7c7aac]/20 backdrop-blur-sm rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-lg shadow-black/30">
        <div>
          <p className="text-sm text-slate-200 font-medium">
            Discover Candidates
          </p>
          <p className="text-xs text-slate-400 mt-1 max-w-lg">
            Let MatchRank scan public GitHub profiles and surface the strongest matches for this role automatically.
          </p>
        </div>

        <button
          onClick={handleDiscover}
          disabled={discovering}
          className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-[0_4px_20px_rgba(124,122,172,0.25)] border border-[#7c7aac]/20
            ${
              discovering
                ? "bg-[#7c7aac]/50 cursor-not-allowed opacity-60 text-white"
                : "bg-[#7c7aac] text-white hover:brightness-110 active:scale-[0.98]"
            }`}
        >
          {discovering ? "Finding best matches…" : "Discover top 10 candidates"}
        </button>
      </div>

      {/* Manual GitHub username input */}
      <CandidateUpload onAnalyze={handleAnalyze} loading={loadingAnalysis} />

      {/* Error */}
      {analysisError && <ErrorBox message={analysisError} />}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-lg font-semibold text-white">Top Matches</h2>

            <Link
              href={`/jobs/${jobId}/results`}
              className="text-sm text-[#7c7aac] hover:text-[#7c7aac]/80 transition-colors hover:underline decoration-[#7c7aac]/50 underline-offset-4"
            >
              View full ranked list →
            </Link>
          </div>

          <CandidateTable results={results.slice(0, 10)} />
        </div>
      )}
    </div>
  );
}