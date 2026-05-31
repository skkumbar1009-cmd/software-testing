import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Award, ArrowRight, Star, Building, SlidersHorizontal } from "lucide-react";
import { INSTITUTES } from "../data/mockData";
import { useAuth } from "../context/AuthContext";

function Institutes() {
  const { savedInstitutes, toggleSaveInstitute } = useAuth();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [minPlacement, setMinPlacement] = useState(85);
  const [sortOption, setSortOption] = useState("rating");

  // Get all unique locations for dropdown filter
  const allLocations = ["All", ...new Set(INSTITUTES.flatMap(i => i.locations))];

  const filteredInstitutes = INSTITUTES.filter((inst) => {
    const matchSearch = inst.name.toLowerCase().includes(search.toLowerCase()) ||
                        inst.description.toLowerCase().includes(search.toLowerCase());

    const matchLocation = location === "All" || inst.locations.includes(location);

    const matchPlacement = inst.placementRate >= minPlacement;

    return matchSearch && matchLocation && matchPlacement;
  }).sort((a, b) => {
    if (sortOption === "placement") return b.placementRate - a.placementRate;
    if (sortOption === "reviews") return b.reviewsCount - a.reviewsCount;
    return b.rating - a.rating; // default: rating
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white">Software Testing Institutes</h1>
        <p className="text-xs text-slate-500">Search and filter top software testing centers in Pune. Compare locations, reviews and hiring pipelines.</p>
      </div>

      {/* Controls panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm items-center">
        {/* Search */}
        <div className="relative col-span-1 lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search institutes by name..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-white"
          />
        </div>

        {/* Location Dropdown */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-slate-200"
          >
            {allLocations.map((loc) => (
              <option key={loc} value={loc}>{loc === "All" ? "All Locations" : loc}</option>
            ))}
          </select>
        </div>

        {/* Sort option */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-slate-200"
          >
            <option value="rating">Sort by Rating ★</option>
            <option value="placement">Sort by Placement %</option>
            <option value="reviews">Sort by Review Count</option>
          </select>
        </div>
      </div>

      {/* Main Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInstitutes.map((inst) => {
          const isSaved = savedInstitutes.includes(inst.id);
          return (
            <div key={inst.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover-lift flex flex-col justify-between relative group">
              
              {/* Profile Card Header */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center font-extrabold text-slate-800 dark:text-slate-200 text-sm shadow-sm">
                    {inst.logo}
                  </div>
                  
                  {/* Rating / Save */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      {inst.rating} ★
                    </span>
                    <button
                      onClick={() => toggleSaveInstitute(inst.id)}
                      className={`text-[9px] font-bold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        isSaved
                          ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-900"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:text-red-500 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-800"
                      }`}
                    >
                      {isSaved ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>

                {/* Info block */}
                <div className="space-y-2">
                  <h4 className="font-poppins font-bold text-base text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug">
                    {inst.name}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {inst.description}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                  <div>
                    <span className="block text-slate-400 font-normal">Placement Rate:</span>
                    <strong className="text-emerald-500 text-xs">{inst.placementRate}% Placed</strong>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-normal">Trained Students:</span>
                    <strong className="text-slate-800 dark:text-white text-xs">{inst.studentsTrained}+</strong>
                  </div>
                </div>
              </div>

              {/* Bottom CTAs */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
                {/* Branch Locations */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 pb-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{inst.locations.join(", ")}</span>
                </div>

                <Link
                  to={`/institutes/${inst.id}`}
                  className="w-full bg-primary text-white hover:bg-blue-700 transition-colors py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/10"
                >
                  View Profiles & Placement Stats <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Institutes;
