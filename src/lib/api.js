import axios from "axios";

const API_BASE = "https://server-sable-ten-44.vercel.app";

/* ---------------------------
   GITHUB PROFILE ANALYSIS
   (Used in Results.jsx)
---------------------------- */
export async function analyzeUser(username) {
  if (!username) throw new Error("Username required");

  const res = await fetch(`${API_BASE}/analyze/${username}`, {
    method: "GET",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to analyze GitHub user");
  }

  return res.json();
}

/* ---------------------------
   JOB ANALYSIS (multiple users)
   Used in JobDetail.jsx
---------------------------- */
export async function analyzeCandidates(jobId, usernames) {
  if (!Array.isArray(usernames) || usernames.length === 0) {
    throw new Error("Usernames must be an array");
  }

  const res = await axios.post(`${API_BASE}/jobs/${jobId}/analyze`, {
    usernames,
  });

  return res.data;
}

/* ---------------------------
   JOB CRUD
---------------------------- */
export async function createJob(payload) {
  return axios.post(`${API_BASE}/jobs`, payload).then((res) => res.data);
}

export async function listJobs() {
  return axios.get(`${API_BASE}/jobs`).then((res) => res.data);
}

export async function getJob(id) {
  return axios.get(`${API_BASE}/jobs/${id}`).then((res) => res.data);
}

export async function getJobResults(jobId) {
  return axios
    .get(`${API_BASE}/jobs/${jobId}/results`)
    .then((res) => res.data);
}

export async function deleteJob(jobId) {
  const res = await fetch(`${API_BASE}/jobs/${jobId}`, {
    method: "DELETE"
  });

  if (!res.ok) throw new Error("Failed to delete job");
  return true;
}


export async function discoverCandidates(jobId) {
  const res = await fetch(`${API_BASE}/discover/${jobId}`);

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Discover request failed");
  }

  return res.json();
}
