// src/pages/SignUp.jsx

import { Link } from "wouter";

export default function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] py-12">
      <div className="w-full max-w-sm p-8 space-y-6 bg-[#0c1223] rounded-xl shadow-2xl border border-white/10">
        <h2 className="text-2xl font-semibold text-white text-center">
          Create Your BeenHire Account
        </h2>
        <form className="space-y-4">
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-slate-400"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Choose a username"
              className="mt-1 block w-full px-4 py-2 bg-[#1f2937] border border-white/5 rounded-md shadow-sm text-white focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
              required
            />
          </div>
          
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-slate-400"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              className="mt-1 block w-full px-4 py-2 bg-[#1f2937] border border-white/5 rounded-md shadow-sm text-white focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-slate-400"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-2 bg-[#1f2937] border border-white/5 rounded-md shadow-sm text-white focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150"
          >
            Sign Up
          </button>
        </form>
        
        <div className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}