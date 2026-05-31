import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { COURSES, INSTITUTES } from "../data/mockData";
import { Link, useNavigate } from "react-router-dom";
import { User, Bookmark, FileText, Sparkles, LogOut, LayoutDashboard, ChevronRight, Award, Compass } from "lucide-react";

function StudentDashboard() {
  const { user, logout, savedCourses, savedInstitutes, enquiries, toggleSaveCourse, toggleSaveInstitute } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  // Redirect if guest/unauthorized access occurs
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="text-xs text-slate-500">Please sign in to access your student workspace.</p>
        <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold inline-block">Login Now</Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Hydrate Saved Items
  const savedCoursesData = COURSES.filter(c => savedCourses.includes(c.id));
  const savedInstitutesData = INSTITUTES.filter(i => savedInstitutes.includes(i.id));

  // Basic recommendations logic:
  // Recommend courses they haven't saved yet, based on their saved tags
  const savedSkills = savedCoursesData.flatMap(c => c.skillsCovered);
  const recommendedCourses = COURSES.filter(
    course => !savedCourses.includes(course.id)
  ).slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm h-fit space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              {user.name ? user.name[0] : "S"}
            </div>
            <div>
              <h4 className="font-poppins font-bold text-xs text-slate-800 dark:text-white truncate max-w-36">{user.name || "Student"}</h4>
              <span className="text-[9px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 font-semibold">{user.role}</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1 text-xs">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-left cursor-pointer transition-colors ${
                activeTab === "profile" ? "bg-primary text-white" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <User className="w-4.5 h-4.5" />
              My Profile
            </button>

            <button
              onClick={() => setActiveTab("courses")}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-left cursor-pointer transition-colors ${
                activeTab === "courses" ? "bg-primary text-white" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <span className="flex items-center gap-3">
                <Bookmark className="w-4.5 h-4.5" />
                Saved Courses
              </span>
              <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">{savedCourses.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("institutes")}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-left cursor-pointer transition-colors ${
                activeTab === "institutes" ? "bg-primary text-white" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <span className="flex items-center gap-3">
                <Compass className="w-4.5 h-4.5" />
                Saved Centers
              </span>
              <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">{savedInstitutes.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("enquiries")}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-left cursor-pointer transition-colors ${
                activeTab === "enquiries" ? "bg-primary text-white" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <span className="flex items-center gap-3">
                <FileText className="w-4.5 h-4.5" />
                My Enquiries
              </span>
              <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">{enquiries.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("recommendations")}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-left cursor-pointer transition-colors ${
                activeTab === "recommendations" ? "bg-primary text-white" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <Sparkles className="w-4.5 h-4.5" />
              AI Suggestions
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer transition-colors pt-6 border-t border-slate-100 dark:border-slate-800 mt-4"
            >
              <LogOut className="w-4.5 h-4.5" />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Dashboard Work Area */}
        <main className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white">Profile Information</h3>
                <p className="text-[10px] text-slate-400">Account login metadata.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/80">
                  <span className="block text-slate-400">Student Name</span>
                  <strong className="text-slate-800 dark:text-white text-sm">{user.name}</strong>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/80">
                  <span className="block text-slate-400">Email Address</span>
                  <strong className="text-slate-800 dark:text-white text-sm">{user.email}</strong>
                </div>
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white">Saved Courses</h3>
                <p className="text-[10px] text-slate-400">Curriculums bookmarked for review.</p>
              </div>

              {savedCoursesData.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No courses bookmarked yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedCoursesData.map((course) => (
                    <div key={course.id} className="border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between hover-lift bg-slate-50 dark:bg-slate-950">
                      <div>
                        <h4 className="font-bold text-xs text-slate-800 dark:text-white">{course.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-1">Duration: {course.duration}</p>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <Link to={`/courses/${course.id}`} className="text-primary text-[10px] font-bold flex items-center gap-1">
                          View Details <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => toggleSaveCourse(course.id)}
                          className="text-red-500 hover:text-red-700 text-[10px] font-bold cursor-pointer"
                        >
                          Unsave
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "institutes" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white">Saved Institutes</h3>
                <p className="text-[10px] text-slate-400">Centers bookmarked for verification.</p>
              </div>

              {savedInstitutesData.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No institutes saved yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedInstitutesData.map((inst) => (
                    <div key={inst.id} className="border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between hover-lift bg-slate-50 dark:bg-slate-950">
                      <div>
                        <h4 className="font-bold text-xs text-slate-800 dark:text-white">{inst.name}</h4>
                        <p className="text-[10px] text-slate-400 mt-1">Placement Rate: {inst.placementRate}%</p>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <Link to={`/institutes/${inst.id}`} className="text-primary text-[10px] font-bold flex items-center gap-1">
                          View Profile <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => toggleSaveInstitute(inst.id)}
                          className="text-red-500 hover:text-red-700 text-[10px] font-bold cursor-pointer"
                        >
                          Unsave
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "enquiries" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white">Admission Enquiries</h3>
                <p className="text-[10px] text-slate-400">Track response status from centers.</p>
              </div>

              {enquiries.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No enquiries submitted yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500">
                        <th className="py-3 px-2 font-bold uppercase tracking-wider text-[9px] text-slate-400">Course</th>
                        <th className="py-3 px-2 font-bold uppercase tracking-wider text-[9px] text-slate-400">Institute</th>
                        <th className="py-3 px-2 font-bold uppercase tracking-wider text-[9px] text-slate-400">Date</th>
                        <th className="py-3 px-2 font-bold uppercase tracking-wider text-[9px] text-slate-400">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries.map((enq) => {
                        const c = COURSES.find(item => item.id === enq.courseId);
                        const i = INSTITUTES.find(item => item.id === enq.instituteId);
                        return (
                          <tr key={enq.id} className="border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors text-slate-700 dark:text-slate-350">
                            <td className="py-3 px-2 font-semibold text-slate-800 dark:text-white">{c ? c.title : enq.courseId}</td>
                            <td className="py-3 px-2 text-slate-700 dark:text-slate-300">{i ? i.name : enq.instituteId}</td>
                            <td className="py-3 px-2 text-slate-500 dark:text-slate-400">{enq.date}</td>
                            <td className="py-3 px-2">
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                enq.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-300"
                                  : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300"
                              }`}>
                                {enq.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "recommendations" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white">AI Course Suggestions</h3>
                <p className="text-[10px] text-slate-400">Custom recommendations mapped to your browsing profile.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedCourses.map((course) => (
                  <div key={course.id} className="border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between hover-lift bg-slate-50 dark:bg-slate-950">
                    <div>
                      <span className="text-[8px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase">AI Match</span>
                      <h4 className="font-bold text-xs text-slate-800 dark:text-white mt-2">{course.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{course.description}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Link to={`/courses/${course.id}`} className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 text-[10px] font-bold py-2 rounded-lg text-center flex items-center justify-center">
                        Syllabus
                      </Link>
                      <button
                        onClick={() => toggleSaveCourse(course.id)}
                        className="flex-1 bg-primary hover:bg-blue-700 text-white text-[10px] font-bold py-2 rounded-lg cursor-pointer"
                      >
                        Save Course
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

export default StudentDashboard;
