import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, Sparkles, BookOpen, Building2, TrendingUp, CheckCircle, ChevronRight, Award, Trophy, Quote, ArrowRight, BookMarked } from "lucide-react";
import { COURSES, INSTITUTES } from "../data/mockData";

// Animated counter helper
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
  };

  const topCourses = COURSES.slice(0, 3);
  const topInstitutes = INSTITUTES.slice(0, 3);

  const faqs = [
    {
      q: "Which Software Testing Course is best for Freshers?",
      a: "For freshers, an Integrated Automation Testing Course (Manual + Java/Python + Selenium + API Testing) is highly recommended. It covers all core competencies required in job postings."
    },
    {
      q: "What is the average starting salary for a QA Engineer in Pune?",
      a: "A fresher software tester in Pune can expect a starting salary package ranging between ₹3.0 LPA to ₹5.5 LPA, depending on their skills and the training institute's placement network."
    },
    {
      q: "Is coding mandatory for Automation Testing?",
      a: "Yes, basic programming knowledge is required for automation tools like Selenium or Appium. The most popular languages are Java and Python, which are taught from scratch in most Pune institutes."
    },
    {
      q: "Can non-IT graduates join testing courses?",
      a: "Absolutely! Over 40% of enrolled students in Pune's software testing institutes come from non-CS/IT backgrounds. Manual testing is logical and easy to learn, and programming basics are built step-by-step."
    }
  ];

  return (
    <div className="mesh-bg animate-mesh pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:py-32 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 space-y-8 z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary dark:text-blue-400 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider animate-pulse-slow">
            <Sparkles className="w-3.5 h-3.5" />
            Pune's Leading EdTech Aggregator
          </div>

          <h1 className="text-4xl md:text-6xl font-poppins font-extrabold text-slate-900 dark:text-white leading-tight">
            Find The Best <br />
            <span className="bg-gradient-to-r from-primary via-blue-600 to-emerald-500 bg-clip-text text-transparent">
              Software Testing
            </span> <br />
            Course In Pune
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
            Compare premium software testing institutes in Pune on syllabus depth, live projects, actual placement rates, and real student reviews. Zero bias, only transparency.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-xl">
            <div className="flex items-center gap-2 px-3 flex-1">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Selenium, API, Manual Testing..."
                className="w-full bg-transparent text-sm focus:outline-none text-slate-800 dark:text-white py-2"
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              Search Courses
            </button>
          </form>

          {/* Action buttons */}
          <div className="flex gap-4">
            <Link
              to="/courses"
              className="text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 px-5 py-3 rounded-xl text-xs font-bold transition-all"
            >
              Explore Courses
            </Link>
            <Link
              to="/compare"
              className="bg-slate-900 hover:bg-black dark:bg-slate-800 dark:hover:bg-slate-700 text-white px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-md shadow-black/10 flex items-center gap-2"
            >
              Compare Institutes <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Dashboard Mock/Illustration */}
        <div className="w-full lg:w-1/2 flex justify-center items-center relative">
          {/* Glass mesh element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[450px] h-[350px] md:h-[450px] bg-gradient-to-tr from-primary to-emerald-500 rounded-full blur-[100px] opacity-20 dark:opacity-10 animate-pulse-slow"></div>

          {/* Floating dashboard panel */}
          <div className="relative w-full max-w-md bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 p-6 shadow-2xl space-y-6 hover-lift">
            <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-slate-800/50 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">testinghub_pune_dashboard</span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-100/50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/20 dark:border-slate-800/40">
                <p className="text-[10px] text-slate-500">Placement Rate</p>
                <p className="text-xl font-poppins font-extrabold text-emerald-500">95%</p>
              </div>
              <div className="bg-slate-100/50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/20 dark:border-slate-800/40">
                <p className="text-[10px] text-slate-500">Highest Salary</p>
                <p className="text-xl font-poppins font-extrabold text-primary">12.0 LPA</p>
              </div>
            </div>

            {/* Simulated Institute List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold text-xs">QS</div>
                  <div>
                    <h5 className="font-semibold text-xs text-slate-800 dark:text-white">QSpiders Pune</h5>
                    <p className="text-[9px] text-slate-400">Deccan Gymkhana</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">95% Placed</span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">TM</div>
                  <div>
                    <h5 className="font-semibold text-xs text-slate-800 dark:text-white">TestoMeter</h5>
                    <p className="text-[9px] text-slate-400">Kothrud</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">94% Placed</span>
                </div>
              </div>
            </div>

            {/* Recommendation Tag */}
            <div className="bg-gradient-to-r from-primary to-emerald-500 text-white p-4 rounded-xl flex items-center justify-between">
              <div>
                <h6 className="font-bold text-xs">AI Recommender</h6>
                <p className="text-[9px] text-white/80">Get course roadmap matches</p>
              </div>
              <Link to="/dashboard" className="bg-white text-slate-900 px-3 py-1.5 rounded-lg text-[9px] font-bold shadow hover:bg-slate-100">
                Match Me
              </Link>
            </div>
          </div>

          {/* Floaters */}
          <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-lg flex items-center gap-3 animate-float">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="font-bold text-[10px] text-slate-800 dark:text-white">100% Assurance</p>
              <p className="text-[8px] text-slate-500">Authorized Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl font-poppins font-extrabold text-primary">
              <Counter end={10000} suffix="+" />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Students Trained</p>
          </div>
          <div className="space-y-1 border-l border-slate-100 dark:border-slate-800">
            <h3 className="text-3xl md:text-4xl font-poppins font-extrabold text-emerald-500">
              <Counter end={5000} suffix="+" />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Placements Achieved</p>
          </div>
          <div className="space-y-1 border-l border-slate-100 dark:border-slate-800">
            <h3 className="text-3xl md:text-4xl font-poppins font-extrabold text-slate-900 dark:text-white">
              <Counter end={50} suffix="+" />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Hiring Partners</p>
          </div>
          <div className="space-y-1 border-l border-slate-100 dark:border-slate-800">
            <h3 className="text-3xl md:text-4xl font-poppins font-extrabold text-amber-500">
              <Counter end={4} suffix=".8 ★" />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Average Rating</p>
          </div>
        </div>
      </section>

      {/* 3. POPULAR COURSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white">Popular Software Testing Courses</h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">Learn tools and frameworks used by elite development teams. Compare course details, fees and live projects.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topCourses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover-lift flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] bg-primary/10 text-primary dark:bg-blue-950/40 dark:text-blue-300 font-bold px-2 py-0.5 rounded-full uppercase">
                    {course.type}
                  </span>
                  {course.badge && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                      {course.badge}
                    </span>
                  )}
                </div>
                <h4 className="font-poppins font-bold text-base text-slate-900 dark:text-white">{course.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{course.description}</p>

                {/* Duration & Fees */}
                <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Duration: <strong>{course.duration}</strong></span>
                  <span>Est Fees: <strong>₹{course.fees.toLocaleString()}</strong></span>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to={`/courses/${course.id}`}
                  className="w-full bg-slate-50 dark:bg-slate-800 hover:bg-primary hover:text-white dark:hover:bg-primary transition-all text-slate-700 dark:text-slate-200 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 hover:border-transparent cursor-pointer"
                >
                  View Syllabus & Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link to="/courses" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer">
            View All Testing Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. TOP INSTITUTES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white">Top Rated Software Testing Institutes in Pune</h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">Compare branch locations, rating scores, student feedback, and historical job assistance data.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topInstitutes.map((inst) => (
            <div key={inst.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover-lift flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold flex items-center justify-center border border-slate-200/50 dark:border-slate-700/50">
                    {inst.logo}
                  </div>
                  <span className="text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    {inst.rating} ★ ({inst.reviewsCount} reviews)
                  </span>
                </div>
                <h4 className="font-poppins font-bold text-base text-slate-900 dark:text-white">{inst.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">{inst.description}</p>

                {/* Placement % and locations */}
                <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between">
                    <span>Placement Support:</span>
                    <span className="font-bold text-emerald-500">{inst.placementRate}% Placed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{inst.locations.join(", ")}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to={`/institutes/${inst.id}`}
                  className="w-full bg-primary text-white hover:bg-blue-700 transition-colors py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/10"
                >
                  View Institute Profile <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link to="/institutes" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer">
            Explore All Institutes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. PLACEMENT SUCCESS & STATS PREVIEW */}
      <section className="bg-slate-900 dark:bg-slate-950/50 text-white rounded-3xl max-w-7xl mx-auto px-6 py-12 md:p-12 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 my-16">
        <div className="w-full md:w-1/2 space-y-6">
          <div className="inline-block bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Verified Placements
          </div>
          <h3 className="text-3xl font-poppins font-extrabold text-white">Join Pune's Strongest QA Placement Network</h3>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
            Our aggregator pools job updates and placement opportunities across SevenMentor, QSpiders, TestoMeter, and other corporate partners, helping you secure MNC interviews.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <span className="block text-[10px] text-slate-500 uppercase font-semibold">Average Salary</span>
              <span className="text-lg font-bold text-white">4.8 LPA</span>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <span className="block text-[10px] text-slate-500 uppercase font-semibold">Highest Package</span>
              <span className="text-lg font-bold text-emerald-400">12.0 LPA</span>
            </div>
          </div>

          <div className="pt-2">
            <Link to="/placements" className="bg-primary hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-primary/20 transition-all">
              View Placement Reports <TrendingUp className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Brand Logos Matrix */}
        <div className="w-full md:w-1/2 bg-slate-800/30 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h5 className="text-[10px] text-slate-500 uppercase tracking-widest font-bold text-center">Our Aligned Hiring Partners</h5>
          <div className="grid grid-cols-3 gap-4 text-center text-xs font-extrabold text-slate-400 select-none">
            {["Cognizant", "TCS", "Accenture", "Infosys", "Zensar", "Persistent", "Capgemini", "Wipro", "Globant"].map((company) => (
              <div key={company} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/30 hover:text-white transition-colors">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white">Student Success Stories</h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">Read how students from non-IT and technical fields gained testing expertise and cracked local interviews.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover-lift flex flex-col justify-between">
            <Quote className="w-8 h-8 text-primary/20 mb-4" />
            <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed mb-6">
              "Being a mechanical engineer, I was worried about coding. The trainers at SevenMentor started from scratch and explained Java testing pipelines beautifully."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-extrabold text-xs text-slate-600">AR</div>
              <div>
                <h5 className="font-semibold text-xs text-slate-800 dark:text-white">Aditya Rane</h5>
                <p className="text-[10px] text-slate-500">Placed at Wipro • 5.2 LPA</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover-lift flex flex-col justify-between">
            <Quote className="w-8 h-8 text-emerald-500/20 mb-4" />
            <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed mb-6">
              "QSpiders Deccan hosted two placement drives in one week. I attended both and got an offer with Cognizant as a Selenium QA automation specialist."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-extrabold text-xs text-slate-600">PJ</div>
              <div>
                <h5 className="font-semibold text-xs text-slate-800 dark:text-white">Priyanka Joshi</h5>
                <p className="text-[10px] text-slate-500">Placed at Cognizant • 6.0 LPA</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover-lift flex flex-col justify-between">
            <Quote className="w-8 h-8 text-primary/20 mb-4" />
            <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed mb-6">
              "The mock testing sessions and API logs analysis workshops at TestoMeter Kothrud were exceptionally close to actual company rounds. Cleared easily!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-extrabold text-xs text-slate-600">SK</div>
              <div>
                <h5 className="font-semibold text-xs text-slate-800 dark:text-white">Siddharth Kale</h5>
                <p className="text-[10px] text-slate-500">Placed at Persistent • 5.8 LPA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-500">Answers to help you navigate software testing course parameters in Pune.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all shadow-sm">
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full flex justify-between items-center p-5 text-left text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
              >
                <span>{faq.q}</span>
                <span className="text-primary font-bold text-sm">{activeFaq === index ? "−" : "+"}</span>
              </button>
              {activeFaq === index && (
                <div className="p-5 pt-0 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
