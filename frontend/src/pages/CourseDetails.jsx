import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { COURSES, INSTITUTES } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
import { Clock, Shield, Tag, Send, CheckCircle, Info, Star, MessageCircle, MapPin, Award, BookOpen } from "lucide-react";
import { DetailsSkeleton } from "../components/SkeletonLoader";

function CourseDetails() {
  const { id } = useParams();
  const { submitEnquiry, user } = useAuth();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedInst, setSelectedInst] = useState("");

  const course = COURSES.find((c) => c.id === id);

  // Simulate skeleton load
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (course) {
        // Pre-select first institute that offers this course
        const defaultInst = INSTITUTES.find(inst => inst.coursesOffered.includes(course.id));
        if (defaultInst) setSelectedInst(defaultInst.id);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [id, course]);

  if (isLoading) {
    return <DetailsSkeleton />;
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Course Not Found</h2>
        <Link to="/courses" className="text-primary hover:underline">Back to all courses</Link>
      </div>
    );
  }

  // Get institutes offering this course
  const offeringInstitutes = INSTITUTES.filter((inst) => inst.coursesOffered.includes(course.id));

  // Get related courses
  const relatedCourses = COURSES.filter((c) => c.id !== course.id).slice(0, 2);

  const handleEnquiry = (e) => {
    e.preventDefault();
    if (!selectedInst) return;

    submitEnquiry({
      courseId: course.id,
      instituteId: selectedInst,
      studentName: name,
      studentEmail: email,
      studentPhone: phone,
      message: message || `Enquiry for ${course.title}`
    });

    setSubmitted(true);
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPhone("");
    setMessage("");
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px]"></div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex gap-2">
            <span className="text-[10px] bg-primary text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {course.type}
            </span>
            <span className="text-[10px] bg-white/10 text-white font-bold px-3 py-1 rounded-full flex items-center gap-1">
              ★ {course.rating} Rating
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-poppins font-extrabold text-white tracking-tight leading-tight">
            {course.title}
          </h1>

          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            {course.description}
          </p>

          <div className="flex flex-wrap gap-6 text-xs text-slate-300 pt-4 border-t border-white/10">
            <div>
              <span className="block text-[10px] text-slate-500 uppercase font-bold">Duration</span>
              <strong className="text-white text-sm">{course.duration}</strong>
            </div>
            <div className="border-l border-white/10 pl-6">
              <span className="block text-[10px] text-slate-500 uppercase font-bold">Estimated Cost</span>
              <strong className="text-white text-sm">₹{course.fees.toLocaleString()}</strong>
            </div>
            <div className="border-l border-white/10 pl-6">
              <span className="block text-[10px] text-slate-500 uppercase font-bold">Pune Center Locations</span>
              <strong className="text-white text-sm">{offeringInstitutes.length} training options</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main content split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Details & Tabs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Navigation tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-sm">
            {["overview", "syllabus", "trainers", "institutes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-xs font-bold rounded-xl uppercase tracking-wider cursor-pointer capitalize transition-all ${
                  activeTab === tab
                    ? "bg-primary text-white shadow"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab contents */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-poppins font-bold text-sm uppercase text-slate-400 mb-3">Key Skills You Will Acquire</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.skillsCovered.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="font-poppins font-bold text-sm uppercase text-slate-400 mb-3">Tools & Frameworks Covered</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.tools.map((tool) => (
                      <span
                        key={tool}
                        className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl text-xs font-semibold"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <h3 className="font-poppins font-bold text-sm uppercase text-slate-400">Why Learn This Course?</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Testing and verification form the backbone of the software development lifecycle. In Pune's IT hubs (Hinjewadi, Magarpatta, Kharadi), there is continuous demand for certified testing resources who understand framework structuring, automation scripting, and backend API verification.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "syllabus" && (
              <div className="space-y-4">
                <h3 className="font-poppins font-bold text-sm uppercase text-slate-400 mb-4">Complete Curriculum Outline</h3>
                <div className="relative border-l border-slate-200 dark:border-slate-800 ml-3 space-y-6">
                  {course.syllabus.map((item, idx) => (
                    <div key={idx} className="relative pl-6">
                      {/* Node point */}
                      <span className="absolute -left-2.5 top-1 bg-primary text-white w-5 h-5 rounded-full border-4 border-slate-50 dark:border-slate-950 flex items-center justify-center text-[8px] font-bold">
                        {idx + 1}
                      </span>
                      <h5 className="font-semibold text-xs text-slate-800 dark:text-white mb-1">Module {idx + 1}</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "trainers" && (
              <div className="space-y-6">
                <h3 className="font-poppins font-bold text-sm uppercase text-slate-400 mb-4">Faculty Profiles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {course.trainers.map((t, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {t[0]}
                      </div>
                      <div>
                        <h5 className="font-semibold text-xs text-slate-800 dark:text-white">{t}</h5>
                        <p className="text-[10px] text-slate-500">Corporate Testing Mentor</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "institutes" && (
              <div className="space-y-4">
                <h3 className="font-poppins font-bold text-sm uppercase text-slate-400 mb-4">Pune Institutes Offering This Course</h3>
                <div className="space-y-3">
                  {offeringInstitutes.map((inst) => (
                    <div key={inst.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-extrabold text-slate-700 dark:text-slate-200 text-xs shadow-sm">
                          {inst.logo}
                        </div>
                        <div>
                          <h5 className="font-bold text-xs text-slate-800 dark:text-white">{inst.name}</h5>
                          <p className="text-[9px] text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            {inst.locations.join(", ")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between border-t sm:border-t-0 border-slate-200 dark:border-slate-800 pt-3 sm:pt-0">
                        <span className="text-[10px] font-bold text-emerald-500">{inst.placementRate}% Placement</span>
                        <Link
                          to={`/institutes/${inst.id}`}
                          className="bg-primary hover:bg-blue-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Enquiry Leads Form */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 relative overflow-hidden">
            <h4 className="font-poppins font-bold text-base text-slate-900 dark:text-white mb-2">Submit Course Enquiry</h4>
            <p className="text-[10px] text-slate-500 mb-6">Compare batches, check slots, and receive syllabus downloads.</p>

            {submitted ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
                <h5 className="font-bold text-xs text-emerald-800 dark:text-emerald-300">Enquiry Submitted!</h5>
                <p className="text-[10px] text-slate-500">The center has been notified. You can track this enquiry status in your Student Dashboard.</p>
              </div>
            ) : (
              <form onSubmit={handleEnquiry} className="space-y-4">
                {/* Select Institute */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Select Center / Institute</label>
                  <select
                    required
                    value={selectedInst}
                    onChange={(e) => setSelectedInst(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-slate-200"
                  >
                    <option value="" disabled>Choose training institute...</option>
                    {offeringInstitutes.map((inst) => (
                      <option key={inst.id} value={inst.id}>
                        {inst.name} ({inst.locations[0]})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-white"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-white"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-white"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Message / Preferred Slots</label>
                  <textarea
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Interested in morning weekend batch."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  Send Enquiry Request <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Related Courses panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
            <h5 className="font-poppins font-bold text-xs uppercase text-slate-400">Recommended Courses</h5>
            <div className="space-y-3">
              {relatedCourses.map((c) => (
                <Link
                  key={c.id}
                  to={`/courses/${c.id}`}
                  className="block bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 hover:border-primary transition-all group"
                >
                  <h6 className="font-semibold text-xs text-slate-800 dark:text-white group-hover:text-primary transition-colors">
                    {c.title}
                  </h6>
                  <p className="text-[10px] text-slate-400 mt-1">Duration: {c.duration}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
