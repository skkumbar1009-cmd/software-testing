import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, LogIn, ShieldAlert, Grid, Info } from "lucide-react";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setError("");
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      if (res.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="mesh-bg animate-mesh min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-white/40 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        {/* Branding Info */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-md mx-auto">
            TH
          </div>
          <h2 className="text-2xl font-poppins font-extrabold text-slate-900 dark:text-white">Sign In</h2>
          <p className="text-[10px] text-slate-500">Access student dashboards and enquiry tracks.</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-300 p-3.5 rounded-xl text-xs flex gap-2 items-center">
            <ShieldAlert className="w-4.5 h-4.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} autoComplete="off" className="space-y-4">
          {/* Email input */}
          <div className="space-y-1.5">
            <label className="block text-[10px] uppercase font-bold text-slate-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. student@testinghub.com"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1.5">
            <label className="block text-[10px] uppercase font-bold text-slate-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            {loading ? "Authenticating..." : "Sign In Account"}
            <LogIn className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          New to TestingHub?{" "}
          <Link to="/register" className="text-primary hover:underline font-bold">
            Join Free
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
