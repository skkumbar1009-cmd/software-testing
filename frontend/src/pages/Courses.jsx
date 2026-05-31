import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, SlidersHorizontal, BookOpen, Clock, Tag, Award, Bookmark, ArrowUpDown, HelpCircle } from "lucide-react";
import { COURSES } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
import { CourseCardSkeleton } from "../components/SkeletonLoader";

function Courses() {
  const [searchParams] = useSearchParams();
  const { savedCourses, toggleSaveCourse } = useAuth();
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedType, setSelectedType] = useState("All");
  const [maxFees, setMaxFees] = useState(30000);
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [placementOnly, setPlacementOnly] = useState(false);
  const [sortOption, setSortOption] = useState("rating");
  const [isLoading, setIsLoading] = useState(true);

  // Sync search query parameter from URL
  useEffect(() => {
    const urlQuery = searchParams.get("search");
    if (urlQuery) setSearch(urlQuery);
  }, [searchParams]);

  // Simulate skeleton load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredCourses = COURSES.filter((course) => {
    const matchSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
                        course.description.toLowerCase().includes(search.toLowerCase()) ||
                        course.tools.some(t => t.toLowerCase().includes(search.toLowerCase()));

    const matchType = selectedType === "All" || course.type === selectedType;

    const matchFees = course.fees <= maxFees;

    const matchDuration = selectedDuration === "All" ||
                          (selectedDuration === "Short" && parseInt(course.duration) <= 4) ||
                          (selectedDuration === "Medium" && parseInt(course.duration) > 4 && parseInt(course.duration) <= 8) ||
                          (selectedDuration === "Long" && parseInt(course.duration) > 8);

    const matchPlacement = !placementOnly || course.placementSupport.includes("100%") || course.placementSupport === "Yes";

    return matchSearch && matchType && matchFees && matchDuration && matchPlacement;
  }).sort((a, b) => {
    if (sortOption === "fees-asc") return a.fees - b.fees;
    if (sortOption === "fees-desc") return b.fees - a.fees;
    if (sortOption === "duration") return parseInt(a.duration) - parseInt(b.duration);
    return b.rating - a.rating; // default: rating sort
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white">Software Testing Courses</h1>
        <p className="text-xs text-slate-500">Explore and compare syllabus modules, tools covered, pricing and live projects across Pune.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Filter Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 h-fit">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="font-poppins font-bold text-xs flex items-center gap-2 text-slate-800 dark:text-slate-200">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              Filter Tools
            </span>
            <button
              onClick={() => {
                setSearch("");
                setSelectedType("All");
                setMaxFees(30000);
                setSelectedDuration("All");
                setPlacementOnly(false);
              }}
              className="text-[10px] text-primary hover:underline cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Difficulty Difficulty Type */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase font-bold text-slate-400">Course level</label>
            <div className="space-y-1.5">
              {["All", "Beginner", "Intermediate", "Advanced", "Professional"].map((lvl) => (
                <label key={lvl} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    checked={selectedType === lvl}
                    onChange={() => setSelectedType(lvl)}
                    className="accent-primary"
                  />
                  {lvl}
                </label>
              ))}
            </div>
          </div>

          {/* Max Fees slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
              <span>Max Fees</span>
              <span className="text-primary font-mono text-[11px]">₹{maxFees.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="30000"
              step="1000"
              value={maxFees}
              onChange={(e) => setMaxFees(parseInt(e.target.value))}
              className="w-full accent-primary bg-slate-200 dark:bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Duration filters */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase font-bold text-slate-400">Duration Range</label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-slate-200"
            >
              <option value="All">All Durations</option>
              <option value="Short">Short (1 - 4 Weeks)</option>
              <option value="Medium">Medium (5 - 8 Weeks)</option>
              <option value="Long">Long (9+ Weeks)</option>
            </select>
          </div>

          {/* Placement support toggle */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <input
              type="checkbox"
              id="placement"
              checked={placementOnly}
              onChange={(e) => setPlacementOnly(e.target.checked)}
              className="accent-primary cursor-pointer w-4 h-4"
            />
            <label htmlFor="placement" className="text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none">
              Placement Support Only
            </label>
          </div>
        </aside>

        {/* Right Side: Course Grid */}
        <div className="flex-grow space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tools or course names..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-white"
              />
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full sm:w-44 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-slate-200"
              >
                <option value="rating">Sort by Rating ★</option>
                <option value="fees-asc">Fees: Low to High</option>
                <option value="fees-desc">Fees: High to Low</option>
                <option value="duration">Sort by Duration</option>
              </select>
            </div>
          </div>

          {/* Grid listing */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(n => <CourseCardSkeleton key={n} />)}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-4">
              <HelpCircle className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="font-poppins font-bold text-base text-slate-800 dark:text-white">No courses matched your query</h3>
              <p className="text-xs text-slate-500">Try adjusting your filters or clearing search query.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedType("All");
                  setMaxFees(30000);
                  setSelectedDuration("All");
                  setPlacementOnly(false);
                }}
                className="bg-primary hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCourses.map((course) => {
                const isSaved = savedCourses.includes(course.id);
                return (
                  <div key={course.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover-lift flex flex-col justify-between relative group">
                    {/* Save button */}
                    <button
                      onClick={() => toggleSaveCourse(course.id)}
                      className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-red-500 cursor-pointer transition-colors"
                      title={isSaved ? "Saved" : "Save Course"}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                    </button>

                    <div className="space-y-4 pr-6">
                      <div className="flex gap-2">
                        <span className="text-[9px] bg-primary/10 text-primary dark:bg-blue-950/40 dark:text-blue-300 font-bold px-2 py-0.5 rounded-full uppercase">
                          {course.type}
                        </span>
                        <span className="text-[9px] bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 font-bold px-2 py-0.5 rounded-full">
                          ★ {course.rating}
                        </span>
                      </div>
                      <h4 className="font-poppins font-bold text-base text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {course.description}
                      </p>

                      {/* Tools tag matrix */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {course.tools.map((t) => (
                          <span key={t} className="text-[9px] bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {course.duration}
                        </span>
                        <span className="font-poppins font-bold text-slate-800 dark:text-white">
                          ₹{course.fees.toLocaleString()}
                        </span>
                      </div>

                      <Link
                        to={`/courses/${course.id}`}
                        className="w-full bg-slate-50 dark:bg-slate-800 hover:bg-primary hover:text-white dark:hover:bg-primary transition-all text-slate-700 dark:text-slate-200 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 border border-slate-200 dark:border-slate-700 hover:border-transparent cursor-pointer"
                      >
                        Syllabus & Centers
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;
