import React, { useState } from "react";
import { Star, MessageSquare, Award, CheckCircle, ShieldAlert } from "lucide-react";
import { INSTITUTES } from "../data/mockData";

function Reviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      studentName: "Aditya Rane",
      instituteName: "SevenMentor",
      courseName: "Automation Testing Masterclass",
      rating: 5,
      comment: "Excellent lab sessions. The framework architecture classes were outstanding. Cleared Wipro interview in my first attempt.",
      date: "2026-05-12"
    },
    {
      id: 2,
      studentName: "Priyanka Joshi",
      instituteName: "QSpiders Pune",
      courseName: "Selenium WebDriver Certification",
      rating: 5,
      comment: "Unmatched placement drives. I attended three drives and received two offers. Deccan branch staff is very supportive.",
      date: "2026-05-20"
    },
    {
      id: 3,
      studentName: "Mayur Patil",
      instituteName: "Fusion Software Institute",
      rating: 4,
      comment: "Affordable training fees with helpful trainers. The manual testing section was very clear. Good placement support.",
      date: "2026-05-24"
    }
  ]);

  // Form states
  const [name, setName] = useState("");
  const [instId, setInstId] = useState("");
  const [course, setCourse] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !instId || !comment) return;

    const matchedInst = INSTITUTES.find(i => i.id === instId);

    const newRev = {
      id: Date.now(),
      studentName: name,
      instituteName: matchedInst ? matchedInst.name : instId,
      courseName: course || "General QA Training",
      rating,
      comment,
      date: new Date().toISOString().split("T")[0]
    };

    setReviews(prev => [newRev, ...prev]);
    setSubmitted(true);
    setName("");
    setInstId("");
    setCourse("");
    setRating(5);
    setComment("");

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white">Student Reviews</h1>
        <p className="text-xs text-slate-500">Read and submit authentic reviews about software testing training quality in Pune.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Submit Review Form */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm h-fit">
          <h4 className="font-poppins font-bold text-base text-slate-900 dark:text-white mb-2">Share Your Review</h4>
          <p className="text-[10px] text-slate-500 mb-6">Your honest feedback helps fellow candidates pick the right training path.</p>

          {submitted ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
              <h5 className="font-bold text-xs text-emerald-800 dark:text-emerald-300">Review Submitted!</h5>
              <p className="text-[10px] text-slate-500">Your feedback has been registered and listed on the reviews feed.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-bold text-slate-400">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-white"
                />
              </div>

              {/* Select Institute */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-bold text-slate-400">Select Institute</label>
                <select
                  required
                  value={instId}
                  onChange={(e) => setInstId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-slate-200"
                >
                  <option value="" disabled>Select center...</option>
                  {INSTITUTES.map(inst => (
                    <option key={inst.id} value={inst.id}>{inst.name}</option>
                  ))}
                </select>
              </div>

              {/* Course studied */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-bold text-slate-400">Course studied (Optional)</label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="e.g. Automation Masterclass"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-white"
                />
              </div>

              {/* Stars rating */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-bold text-slate-400">Rating Stars</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${rating >= star ? "fill-amber-400" : "text-slate-300"}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-bold text-slate-400">Write your feedback</label>
                <textarea
                  rows="4"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details about training quality, infrastructure, and placement support..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-bold shadow-lg shadow-primary/20 cursor-pointer"
              >
                Submit My Review
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Reviews Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-poppins font-bold text-xs text-slate-800 dark:text-white">{rev.studentName}</h5>
                    <p className="text-[9px] text-slate-400">Reviewed on {rev.date}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className={`w-4.5 h-4.5 ${rev.rating >= n ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-800"}`} />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="inline-block text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold px-2 py-0.5 rounded-full">
                    {rev.instituteName} • {rev.courseName}
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
