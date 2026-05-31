import React from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { PLACEMENTS } from "../data/mockData";
import { Trophy, TrendingUp, Sparkles, Building2, Quote, ArrowUpRight } from "lucide-react";

function Placements() {
  const { highestPackage, avgPackage, studentsPlaced, activePartners, trends, companyDemand, recentSuccessStories } = PLACEMENTS;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px]"></div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex gap-2">
            <span className="text-[10px] bg-emerald-500 text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              100% Verification
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-poppins font-extrabold text-white tracking-tight leading-tight">
            Pune QA Placement Report
          </h1>

          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            Consolidated reports detailing placement success records, hiring requirements, average packages, and highest offers across top training partners in Pune.
          </p>
        </div>
      </div>

      {/* 2. Stats Grid Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-center">
          <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Highest Package Offered</span>
          <span className="text-2xl md:text-3xl font-poppins font-extrabold text-emerald-500">{highestPackage}</span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-center">
          <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Avg Starting Package</span>
          <span className="text-2xl md:text-3xl font-poppins font-extrabold text-primary">{avgPackage}</span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-center">
          <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Students Placed</span>
          <span className="text-2xl md:text-3xl font-poppins font-extrabold text-slate-950 dark:text-white">{studentsPlaced}</span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-center">
          <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Active Hiring Partners</span>
          <span className="text-2xl md:text-3xl font-poppins font-extrabold text-amber-500">{activePartners}</span>
        </div>
      </div>

      {/* 3. Recharts Graphics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Salary Package Trend Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div>
            <h4 className="font-poppins font-bold text-sm text-slate-800 dark:text-white">Annual Placement Volume & Average Salaries</h4>
            <p className="text-[10px] text-slate-400">Comparing growth of placed candidates and salaries in Pune testing institutes.</p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends}>
                <defs>
                  <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="avgSalary" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorSalary)" name="Average Salary (LPA)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skillset Demand Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div>
            <h4 className="font-poppins font-bold text-sm text-slate-800 dark:text-white">QA Technology Skills Hiring Demand</h4>
            <p className="text-[10px] text-slate-400">Current share of job opening requirements in Pune IT sectors (2026).</p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={companyDemand} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} width={130} />
                <Tooltip />
                <Bar dataKey="demand" fill="#10b981" radius={[0, 6, 6, 0]} name="Hiring Demand %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Hiring Partners Logos */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <h4 className="font-poppins font-bold text-base text-slate-900 dark:text-white">Active Recruiting Companies</h4>
          <p className="text-xs text-slate-500">MNC and mid-sized product companies hiring QA engineers from our partner centers.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 text-center text-xs font-bold text-slate-600 dark:text-slate-300">
          {["Cognizant", "TCS", "Accenture", "Infosys", "Zensar", "Persistent", "Capgemini", "Wipro", "Globant", "Zeta", "Synechron", "LTI"].map((company) => (
            <div key={company} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/80 hover:text-primary transition-colors cursor-default">
              {company}
            </div>
          ))}
        </div>
      </section>

      {/* 5. Success Stories */}
      <section className="space-y-6">
        <div>
          <h4 className="font-poppins font-bold text-lg text-slate-800 dark:text-white">Recent Success Stories</h4>
          <p className="text-xs text-slate-500">Read what software testing candidates have achieved.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentSuccessStories.map((story, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover-lift flex flex-col justify-between">
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed mb-6">
                "I was struggling to switch careers until the mock interviews and syllabus depth prepared me. Cracking the technical test was extremely smooth."
              </p>
              <div className="flex items-center gap-3">
                <img src={story.img} alt={story.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-800" />
                <div>
                  <h5 className="font-semibold text-xs text-slate-800 dark:text-white">{story.name}</h5>
                  <p className="text-[9px] text-slate-500">Placed at {story.to} • {story.package}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Placements;
