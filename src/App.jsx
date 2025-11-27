import { Route, Switch, Link } from "wouter";
import Results from "./pages/Results";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobCreate from "./pages/JobCreate";
import JobDetail from "./pages/JobDetail";
import JobResults from "./pages/JobResults";  

export default function App() {
  return (
    <>
      <div className="app-bg" />

      <div className="min-h-screen flex flex-col">
        {/* Top bar */}
       <header className="sticky top-0 z-20 border-b border-white/5 bg-[#020617]/70 backdrop-blur-xl">
  <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">

    {/* Brand */}
    <Link href="/" className="flex items-center gap-3 cursor-pointer">
      {/* Image from /public/logo.png */}
      <img
        src="/beenhire_logo.png"
        alt="BeEnHire Logo"
        className="h-14 w-14 rounded-2xl object-cover shadow-md"
      />

      <div className="flex flex-col leading-tight">
        <span className="font-semibold tracking-tight text-[15px]">
          BeenHire
        </span>
        <span className="text-[11px] text-slate-400">
          AI-powered GitHub work profile
        </span>
      </div>
    </Link>

    {/* Status */}
    <div className="flex items-center gap-2 text-xs text-slate-400">
      <span className="hidden sm:inline">Powered by GitHub + AI</span>
      <span className="w-1 h-1 rounded-full bg-emerald-400" />
      <span className="text-emerald-300">Online</span>
    </div>
  </div>
</header>


        {/* Main content */}
        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/results/:username" component={Results} />
              <Route path="/jobs" component={Jobs} />
<Route path="/jobs/create" component={JobCreate} />
<Route path="/jobs/:id" component={JobDetail} />
<Route path="/jobs/:id/results" component={JobResults} />
              <Route>
                <div className="text-center text-slate-400 text-sm">
                  Page not found.
                </div>
              </Route>
            </Switch>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-[#020617]/80">
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
