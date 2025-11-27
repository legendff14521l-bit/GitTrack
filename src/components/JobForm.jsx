import { useState } from "react";

export default function JobForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    location: "",
    seniority: "",
    stackMust: "",
    stackNice: "",
    responsibilities: "",
    culture: "",
    salaryRange: ""
  });

  function update(k, v) {
    setForm({ ...form, [k]: v });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      ...form,
      stackMust: form.stackMust.split(",").map((v) => v.trim()),
      stackNice: form.stackNice.split(",").map((v) => v.trim())
    });
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
      <div>
        <p className="section-title">Job Details</p>
      </div>

      <Input label="Title" value={form.title} onChange={(v) => update("title", v)} />
      <Input label="Location" value={form.location} onChange={(v) => update("location", v)} />
      <Input label="Experience" value={form.seniority} onChange={(v) => update("seniority", v)} />

      <Input
        label="Must-have Technologies (comma separated)"
        value={form.stackMust}
        onChange={(v) => update("stackMust", v)}
      />

      <Input
        label="Nice-to-have Technologies (comma separated)"
        value={form.stackNice}
        onChange={(v) => update("stackNice", v)}
      />

      <Textarea
        label="Responsibilities"
        value={form.responsibilities}
        onChange={(v) => update("responsibilities", v)}
      />

      <Textarea
        label="Culture"
        value={form.culture}
        onChange={(v) => update("culture", v)}
      />

      <Input
        label="Salary Range"
        value={form.salaryRange}
        onChange={(v) => update("salaryRange", v)}
      />

      <button className="w-full p-3 rounded-xl bg-sky-600 hover:bg-sky-700">
        Create Job
      </button>
    </form>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-slate-300">{label}</label>
      <input
        {...props}
        type="text"
        className="w-full p-3 bg-black/40 border border-white/10 rounded-xl"
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-slate-300">{label}</label>
      <textarea
        {...props}
        className="w-full p-3 bg-black/40 border border-white/10 rounded-xl"
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}
