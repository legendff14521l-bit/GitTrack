// src/pages/Login.jsx

import { Link, useLocation } from "wouter";
import { useState } from "react"; 

export default function Login({ onLoginSuccess }) { 
  // State to manage the active login type: 'candidate' or 'recruiter'
  const [loginType, setLoginType] = useState('candidate');
  const [location, setLocation] = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // --- Mock Login Logic ---
    // 1. Get form input values
    const usernameOrEmail = e.target.email.value;
    const password = e.target.password.value;

    const mockCandidateUser = "c12";
    const mockCandidatePass = "c12";
    const mockRecruiterUser = "r12";
    const mockRecruiterPass = "r12";

    let isAuthenticated = false;
    let targetPath = "";
    let alertMessage = "";

    if (loginType === 'candidate') {
        if (usernameOrEmail === mockCandidateUser && password === mockCandidatePass) {
            isAuthenticated = true;
            targetPath = "/dashboard";
        } else {
            alertMessage = "Candidate login failed. Use mock credentials:\nUser: candidate123\nPass: candidate123";
        }
    } else if (loginType === 'recruiter') {
        if (usernameOrEmail === mockRecruiterUser && password === mockRecruiterPass) {
            isAuthenticated = true;
            targetPath = "/jobs";
        } else {
            alertMessage = "Recruiter login failed. Use mock credentials:\nEmail: recruiter123\nPass: recruiter123";
        }
    }

    if (isAuthenticated) {
        // *** NEW: Call the success handler from App.jsx ***
        onLoginSuccess();
        // Redirect upon successful mock login
        setLocation(targetPath);
    } else {
        alert(alertMessage);
    }
    // --- End Mock Login Logic ---
  };

  // --- External Login Buttons Component ---
  const ExternalLoginButtons = () => (
    <div className="space-y-3 pt-6 border-t border-[#7c7aac]/20">
      <p className="text-center text-xs text-slate-500 font-medium">
        Or continue with
      </p>
      
      {/* 1. GitHub Login Button */}
      <button
        type="button"
        onClick={() => alert("Redirecting to GitHub OAuth...")} 
        className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800/50 text-sm font-medium text-slate-200 hover:bg-[#7c7aac]/10 hover:border-[#7c7aac]/50 transition duration-150"
      >
        <span className="text-xl mr-2">🐙</span>
        Connect GitHub
      </button>

      {/* 2. LinkedIn Login Button */}
      <button
        type="button"
        onClick={() => alert("Redirecting to LinkedIn OAuth...")} 
        className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800/50 text-sm font-medium text-slate-200 hover:bg-[#7c7aac]/10 hover:border-[#7c7aac]/50 transition duration-150"
      >
        <span className="text-xl mr-2">🔗</span>
        Connect LinkedIn
      </button>
    </div>
  );

  // --- Candidate Form Component ---
  const CandidateForm = () => (
    <>
      <form className="space-y-5" onSubmit={handleLogin}>
        <div className="space-y-1">
          <label 
            htmlFor="candidate-email" 
            className="block text-sm font-medium text-slate-300"
          >
            Developer/Candidate Email
          </label>
          <input
            type="text"
            id="candidate-email"
            name="email" // Important for handleLogin
            placeholder="Mock: candidate123"
            className="block w-full rounded-xl border border-slate-700 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-[#7c7aac] focus:ring-2 focus:ring-[#7c7aac]/20 outline-none transition"
            required
          />
        </div>

        <div className="space-y-1">
          <label 
            htmlFor="candidate-password" 
            className="block text-sm font-medium text-slate-300"
          >
            Password
          </label>
          <input
            type="password"
            id="candidate-password"
            name="password" // Important for handleLogin
            placeholder="Mock: candidate123"
            className="block w-full rounded-xl border border-slate-700 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-[#7c7aac] focus:ring-2 focus:ring-[#7c7aac]/20 outline-none transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#7c7aac] py-2.5 text-sm font-medium text-white shadow-[0_4px_20px_rgba(124,122,172,0.25)] hover:brightness-110 active:scale-[0.99] transition border border-[#7c7aac]/20"
        >
          Login with Email/Password
        </button>
      </form>
      <ExternalLoginButtons />
    </>
  );

  // --- Recruiter Form Component ---
  const RecruiterForm = () => (
    <>
      <form className="space-y-5" onSubmit={handleLogin}>
        <div className="space-y-1">
          <label 
            htmlFor="recruiter-email" 
            className="block text-sm font-medium text-slate-300"
          >
            Recruiter/Employer Email
          </label>
          <input
            type="text"
            id="recruiter-email"
            name="email" // Important for handleLogin
            placeholder="Mock: recruiter123"
            className="block w-full rounded-xl border border-slate-700 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-[#7c7aac] focus:ring-2 focus:ring-[#7c7aac]/20 outline-none transition"
            required
          />
        </div>

        <div className="space-y-1">
          <label 
            htmlFor="recruiter-password" 
            className="block text-sm font-medium text-slate-300"
          >
            Company Password
          </label>
          <input
            type="password"
            id="recruiter-password"
            name="password" // Important for handleLogin
            placeholder="Mock: recruiter123"
            className="block w-full rounded-xl border border-slate-700 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-[#7c7aac] focus:ring-2 focus:ring-[#7c7aac]/20 outline-none transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#7c7aac] py-2.5 text-sm font-medium text-white shadow-[0_4px_20px_rgba(124,122,172,0.25)] hover:brightness-110 active:scale-[0.99] transition border border-[#7c7aac]/20"
        >
          Login with Email/Password
        </button>
      </form>
      <ExternalLoginButtons />
    </>
  );

  const TabButton = ({ type, children }) => (
    <button
      type="button"
      onClick={() => setLoginType(type)}
      className={`flex-1 py-3 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
        loginType === type
          ? "border-[#7c7aac] text-white bg-[#7c7aac]/10"
          : "text-slate-500 hover:text-slate-300 border-transparent hover:bg-[#7c7aac]/5"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex items-center justify-center min-h-[70vh] py-12">
      {/* Container - Glass effect to match Home.jsx */}
      <div className="w-full max-w-sm p-8 space-y-6 bg-slate-900/40 border border-[#7c7aac]/20 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/50">
        <h2 className="text-2xl font-semibold text-white text-center tracking-tight">
          What is your role?
        </h2>

        {/* Tab Selector */}
        <div className="flex border-b border-[#7c7aac]/20 mb-6">
          <TabButton type="candidate">
            🧑‍💻 Candidate
          </TabButton>
          <TabButton type="recruiter">
            💼 Recruiter
          </TabButton>
        </div>
        
        {/* Render the active form */}
        {loginType === 'candidate' ? <CandidateForm /> : <RecruiterForm />}
        
        <div className="text-center text-sm text-slate-500 pt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-slate-300 hover:text-[#7c7aac] hover:underline font-medium transition-colors">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}