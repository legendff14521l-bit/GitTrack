import { useEffect, useState } from "react";
import { Link } from "wouter";
import { listJobs, deleteJob } from "../lib/api";
import JobCard from "../components/JobCard";
import LoadingSpinner from "../components/loadingspinner";
import ErrorBox from "../components/ErrorBox";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [state, setState] = useState("loading");

  useEffect(() => {
    listJobs()
      .then((data) => {
        setJobs(data);
        setState("done");
      })
      .catch(() => setState("error"));
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this job permanently?")) return;

    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      alert("Failed to delete the job.");
    }
  }

  if (state === "loading") return <LoadingSpinner />;
  if (state === "error") return <ErrorBox message="Failed to load jobs." />;

  return (
    <div className="space-y-10 animate-fade-in w-full max-w-5xl mx-auto py-8">
      <div className="flex justify-between items-center">
        {/* Updated Heading to simple White/Slate */}
        <h1 className="text-3xl font-semibold text-white tracking-tight">
          MatchRank Jobs
        </h1>

        <Link
          href="/jobs/create"
          // Updated to Lavender Purple (#7c7aac) + borders + matching shadow
          className="px-4 py-2.5 rounded-xl bg-[#7c7aac] hover:brightness-110 text-sm font-medium text-white shadow-[0_4px_20px_rgba(124,122,172,0.25)] border border-[#7c7aac]/20 transition-all active:scale-[0.98]"
        >
          + New Job
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {jobs.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 border border-dashed border-[#7c7aac]/30 rounded-2xl bg-[#7c7aac]/5">
            <p className="text-slate-400 text-sm">No jobs posted yet.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}