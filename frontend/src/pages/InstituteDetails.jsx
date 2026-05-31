import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { INSTITUTES, COURSES } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
import { MapPin, Phone, Mail, Award, Clock, Users, Building, Send, CheckCircle, Image, Star, ChevronRight } from "lucide-react";
import { DetailsSkeleton } from "../components/SkeletonLoader";

function InstituteDetails() {
  const { id } = useParams();
  const { submitEnquiry, user } = useAuth();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const inst = INSTITUTES.find((i) => i.id === id);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (inst && inst.coursesOffered.length > 0) {
        setSelectedCourse(inst.coursesOffered[0]);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [id, inst]);

  if (isLoading) {
    return <DetailsSkeleton />;
  }

  if (!inst) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Institute Not Found</h2>
        <Link to="/institutes" className="text-primary hover:underline">Back to all institutes</Link>
      </div>
    );
  }

  // Get courses offered by this institute
  const courses = COURSES.filter((c) => inst.coursesOffered.includes(c.id));

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!selectedCourse) return;

    submitEnquiry({
      courseId: selectedCourse,
      instituteId: inst.id,
      studentName: name,
      studentEmail: email,
      studentPhone: phone,
      message: message || `Interested in courses offered at ${inst.name}`
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
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px]"></div>

        <div className="flex flex-col md:flex-row gap-6 md:items-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white text-slate-800 flex items-center justify-center font-extrabold text-xl shadow-md shrink-0">
            {inst.logo}
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-poppins font-extrabold text-white tracking-tight leading-tight">
              {inst.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-slate-500" />
                {inst.locations.join(", ")}
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">{inst.placementRate}% Placement Assistance</span>
              <span>•</span>
              <span className="text-amber-400 font-bold">{inst.rating} ★ ({inst.reviewsCount} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Navigation tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-sm">
            {["overview", "courses", "placements", "gallery", "trainers"].map((tab) => (
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

          {/* Tab sheets */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-poppins font-bold text-xs uppercase text-slate-400 mb-2">About The Institute</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {inst.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl">
                    <span className="block text-[10px] text-slate-500 uppercase">Average Salary</span>
                    <strong className="text-base text-slate-800 dark:text-white">{inst.avgPackage}</strong>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl">
                    <span className="block text-[10px] text-slate-500 uppercase">Highest Package</span>
                    <strong className="text-base text-emerald-500">{inst.highestPackage}</strong>
                  </div>
                </div>

                {/* Contact information */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <h3 className="font-poppins font-bold text-xs uppercase text-slate-400 mb-1">Direct Help Desk</h3>
                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{inst.phone}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{inst.email}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="space-y-4">
                <h3 className="font-poppins font-bold text-xs uppercase text-slate-400 mb-4">Syllabus Programs Offered</h3>
                <div className="space-y-3">
                  {courses.map((course) => (
                    <div key={course.id} className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h4 className="font-bold text-xs text-slate-800 dark:text-white">{course.title}</h4>
                        <p className="text-[10px] text-slate-500 mt-1">Duration: {course.duration} • Level: {course.type}</p>
                      </div>
                      <Link
                        to={`/courses/${course.id}`}
                        className="bg-primary hover:bg-blue-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                      >
                        Explore Syllabus <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "placements" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-poppins font-bold text-xs uppercase text-slate-400 mb-3">Key Hiring Partners</h3>
                  <div className="flex flex-wrap gap-2">
                    {inst.hiringPartners.map((partner) => (
                      <span key={partner} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-xl text-xs font-semibold">
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <h3 className="font-poppins font-bold text-xs uppercase text-slate-400">Student Reviews</h3>
                  <div className="space-y-4">
                    {inst.testimonials.map((test, index) => (
                      <div key={index} className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl space-y-3 border border-slate-100 dark:border-slate-900">
                        <p className="text-xs italic text-slate-600 dark:text-slate-300">"{test.text}"</p>
                        <div className="flex justify-between items-center text-[10px] text-slate-500">
                          <span><strong>{test.studentName}</strong> ({test.course})</span>
                          <span className="text-emerald-500 font-bold">Placed at {test.company} ({test.package})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="space-y-4">
                <h3 className="font-poppins font-bold text-xs uppercase text-slate-400 mb-4">Training Center Gallery</h3>
                {inst.gallery.length === 0 ? (
                  <p className="text-xs text-slate-500 italic text-center py-10 bg-slate-50 dark:bg-slate-950 rounded-2xl">
                    No center gallery photos uploaded yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {inst.gallery.map((img, idx) => (
                      <img key={idx} src={img} alt="Center gallery" className="w-full h-40 object-cover rounded-xl shadow-sm border border-slate-200 dark:border-slate-800" />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "trainers" && (
              <div className="space-y-4">
                <h3 className="font-poppins font-bold text-xs uppercase text-slate-400 mb-4">Assigned Mentors</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {inst.trainers.map((t, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2">
                      <h5 className="font-bold text-xs text-slate-800 dark:text-white">{t.name}</h5>
                      <div className="text-[10px] text-slate-500 space-y-0.5">
                        <p>Role: {t.role}</p>
                        <p>Experience: {t.exp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side contact form */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6">
            <h4 className="font-poppins font-bold text-base text-slate-900 dark:text-white mb-2">Request Admission Info</h4>
            <p className="text-[10px] text-slate-500 mb-6">Connect with center coordinators directly to schedule batch orientations.</p>

            {submitted ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
                <h5 className="font-bold text-xs text-emerald-800 dark:text-emerald-300">Admission enquiry logged!</h5>
                <p className="text-[10px] text-slate-500">The center has been flagged. Check your dashboard feed for subsequent notifications.</p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                {/* Select Course */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Select Desired Course</label>
                  <select
                    required
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-slate-200"
                  >
                    <option value="" disabled>Select target course...</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Pune Student"
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
                    placeholder="e.g. student@testinghub.com"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-white"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Mobile / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 90000 00000"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-white"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Your Message</label>
                  <textarea
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mention batch slots or target schedules..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  Request Call Back <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstituteDetails;
