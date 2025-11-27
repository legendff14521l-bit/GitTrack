import { Route, Switch, Link, Redirect, useLocation } from "wouter"; 
import { useState } from "react"; 
import Results from "./pages/Results";
import Jobs from "./pages/Jobs";
import JobCreate from "./pages/JobCreate";
import JobDetail from "./pages/JobDetail";
import JobResults from "./pages/JobResults"
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard"; 

export default function App() {
  // Use wouter's useLocation hook to get the navigation setter
  const [location, setLocation] = useLocation(); 

  // --- MOCK AUTHENTICATION STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Handlers to simulate login/logout
  const handleLoginSuccess = () => setIsLoggedIn(true);

  // *** UPDATED LOGOUT FUNCTION ***
  const handleLogout = () => {
    // 1. Clear the login state
    setIsLoggedIn(false); 
    // 2. Redirect the user to the /login route
    setLocation("/login");
  };

  // --- NAVIGATION LINKS COMPONENT ---
  const NavLinks = () => {
    if (isLoggedIn) {
      return (
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link 
            href="/dashboard" 
            className="text-white hover:text-[#7c7aac] transition-colors"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout} // Calls the updated function
            className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link 
            href="/login" 
            className="text-slate-200 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link 
            href="/signup" 
            className="bg-[#7c7aac] hover:brightness-110 text-white px-4 py-2 rounded-lg transition-all shadow-[0_4px_20px_rgba(124,122,172,0.25)] border border-[#7c7aac]/20"
          >
            Sign Up
          </Link>
        </div>
      );
    }
  };
  // ---------------------------------

  return (
    <>
      <div className="app-bg-#7c7aac" />

      <div className="min-h-screen flex flex-col">
        {/* Top bar - Updated with full lavender purple glass effect */}
        <header className="sticky top-0 z-20 border-b border-[#7c7aac]/10 bg-[#7c7aac]/20 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            {/* Brand - Links to Dashboard when logged in */}
            <Link href={isLoggedIn ? "/login" : "/"} className="flex items-center gap-3 cursor-pointer group"> 
              {/* Image from /public/logo.png */}
              <img
                src="/logo1.png"
                alt="BeEnHire Logo"
                className="h-14 w-14 rounded-2xl object-cover shadow-md group-hover:ring-2 group-hover:ring-[#7c7aac]/50 transition-all"
              />

              <div className="flex flex-col leading-tight">
                <span className="font-semibold tracking-tight text-[15px] group-hover:text-white transition-colors">
                  BeenHire
                </span>
                <span className="text-[11px] text-slate-200/80">
                  AI-Powered Hiring. Where Companies Apply to You.
                </span>
              </div>
            </Link>

            {/* Render conditional links */}
            <NavLinks />
            
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <Switch>
              
              {/* 1. Redirect root path based on login status */}
              <Route path="/">
                  {isLoggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
              </Route>

              {/* 2. Login routes - Pass the login success handler */}
              <Route path="/login">
                <Login onLoginSuccess={handleLoginSuccess} />
              </Route>
              <Route path="/auth/login">
                <Login onLoginSuccess={handleLoginSuccess} />
              </Route>

              {/* 3. Sign Up route */}
              <Route path="/signup" component={SignUp} />

              {/* 4. Dashboard Routes */}
              <Route path="/dashboard" component={Dashboard} /> 
              <Route path="/jobs" component={Jobs} />

              {/* Existing routes */}
              <Route path="/results/:username" component={Results} />
              <Route path="/jobs" component={Jobs} />
              <Route path="/jobs/create" component={JobCreate} />
              <Route path="/jobs/:id" component={JobDetail} />
              <Route path="/jobs/:id/results" component={JobResults} />
              <Route>
                <div className="text-center text-slate-400 text-sm py-10">
                  Page not found.
                </div>
              </Route>
            </Switch>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#7c7aac]/20 bg-[#020617]/80">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between text-[11px] text-slate-500">
            <span>BeenHire · GitHub profile intelligence</span>
            <span className="hidden sm:inline">
              Tip: Try analyzing a profile with at least a few public repos.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}