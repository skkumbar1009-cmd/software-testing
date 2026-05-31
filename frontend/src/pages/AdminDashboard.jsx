import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { COURSES, INSTITUTES } from "../data/mockData";
import { Link, useNavigate } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Grid, Users, Building, ShieldAlert, CheckCircle, Clock, Trash2, Edit, Plus, FileSpreadsheet, Play } from "lucide-react";

function AdminDashboard() {
  const { user, enquiries, updateEnquiryStatus, usersList, deleteUser } = useAuth();
  const [activeTab, setActiveTab] = useState("leads");
  const navigate = useNavigate();

  // Redirect if not admin
  if (!user || user.role !== "Admin") {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="text-xs text-slate-500">Only authorized administrators can access this workspace.</p>
        <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold inline-block">Login as Admin</Link>
      </div>
    );
  }

  // Analytics Metrics
  const totalLeads = enquiries.length;
  const pendingLeads = enquiries.filter(e => e.status === "Pending").length;
  const contactedLeads = enquiries.filter(e => e.status === "Contacted").length;
  const conversionRate = totalLeads > 0 ? ((contactedLeads / totalLeads) * 100).toFixed(1) : "0.0";

  // Chart Data
  const leadSourceData = [
    { name: "SevenMentor", leads: enquiries.filter(e => e.instituteId === "sevenmentor").length },
    { name: "QSpiders", leads: enquiries.filter(e => e.instituteId === "qspiders").length },
    { name: "TestoMeter", leads: enquiries.filter(e => e.instituteId === "testometer").length },
    { name: "Skillio", leads: enquiries.filter(e => e.instituteId === "skillio").length },
    { name: "3RI Tech", leads: enquiries.filter(e => e.instituteId === "three-ri").length }
  ];

  const monthlyGrowth = [
    { month: "Jan", enquiries: 0, conversions: 0 },
    { month: "Feb", enquiries: 0, conversions: 0 },
    { month: "Mar", enquiries: 0, conversions: 0 },
    { month: "Apr", enquiries: 0, conversions: 0 },
    { month: "May", enquiries: totalLeads, conversions: contactedLeads }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. Header Desk */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 gap-4">
        <div>
          <span className="text-[9px] bg-slate-900 text-white font-mono px-2 py-0.5 rounded uppercase">Stripe & Notion Inspired</span>
          <h1 className="text-2xl md:text-3xl font-poppins font-extrabold text-slate-900 dark:text-white mt-1">Admin Operations Center</h1>
          <p className="text-xs text-slate-500">Real-time student leads pipeline, center allocations, and course demands analytics.</p>
        </div>

        <div className="flex gap-2">
          <button className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer">
            <FileSpreadsheet className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* 2. Analytical Metric Panels */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-1">
          <span className="block text-[9px] text-slate-400 font-bold uppercase">Total Leads Received</span>
          <span className="text-2xl font-poppins font-extrabold text-primary">{totalLeads}</span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-1">
          <span className="block text-[9px] text-slate-400 font-bold uppercase">Active Pending Status</span>
          <span className="text-2xl font-poppins font-extrabold text-yellow-500">{pendingLeads}</span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-1">
          <span className="block text-[9px] text-slate-400 font-bold uppercase">Contacted Desk Leads</span>
          <span className="text-2xl font-poppins font-extrabold text-emerald-500">{contactedLeads}</span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-1">
          <span className="block text-[9px] text-slate-400 font-bold uppercase">Students Signed Up</span>
          <span className="text-2xl font-poppins font-extrabold text-indigo-500">{usersList ? usersList.length : 0}</span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-1">
          <span className="block text-[9px] text-slate-400 font-bold uppercase">Est. Conversion Rate</span>
          <span className="text-2xl font-poppins font-extrabold text-amber-500">{conversionRate}%</span>
        </div>
      </div>

      {/* 3. Recharts Graphics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div>
            <h4 className="font-poppins font-bold text-xs text-slate-800 dark:text-white uppercase tracking-wider">Leads & Admission Conversions Trend</h4>
            <p className="text-[9px] text-slate-400">Monthly breakdown comparing student enquiries to successful registrations.</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="enquiries" stroke="#2563eb" strokeWidth={3} name="Total Enquiries" />
                <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={3} name="Conversions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div>
            <h4 className="font-poppins font-bold text-xs text-slate-800 dark:text-white uppercase tracking-wider">Leads Distribution By Center</h4>
            <p className="text-[9px] text-slate-400">Comparing lead counts received across partner institutes.</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadSourceData}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Bar dataKey="leads" fill="#2563eb" radius={[6, 6, 0, 0]} name="Leads Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Controls Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-sm mb-6">
        <button
          onClick={() => setActiveTab("leads")}
          className={`flex-1 py-3 text-xs font-bold rounded-xl uppercase tracking-wider cursor-pointer capitalize transition-all ${
            activeTab === "leads" ? "bg-primary text-white shadow" : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
          }`}
        >
          Leads Pipeline ({enquiries.length})
        </button>
        <button
          onClick={() => setActiveTab("students")}
          className={`flex-1 py-3 text-xs font-bold rounded-xl uppercase tracking-wider cursor-pointer capitalize transition-all ${
            activeTab === "students" ? "bg-primary text-white shadow" : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
          }`}
        >
          Students Joined ({usersList ? usersList.length : 0})
        </button>
        <button
          onClick={() => setActiveTab("institutes")}
          className={`flex-1 py-3 text-xs font-bold rounded-xl uppercase tracking-wider cursor-pointer capitalize transition-all ${
            activeTab === "institutes" ? "bg-primary text-white shadow" : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
          }`}
        >
          Center Allocations ({INSTITUTES.length})
        </button>
        <button
          onClick={() => setActiveTab("courses")}
          className={`flex-1 py-3 text-xs font-bold rounded-xl uppercase tracking-wider cursor-pointer capitalize transition-all ${
            activeTab === "courses" ? "bg-primary text-white shadow" : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
          }`}
        >
          Manage Syllabus ({COURSES.length})
        </button>
      </div>

      {/* 5. Working Tab Sheets */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        {activeTab === "leads" && (
          <div className="space-y-4">
            <h3 className="font-poppins font-bold text-xs uppercase text-slate-400">Incoming Student Leads Table</h3>
            {enquiries.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No incoming student leads available.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500">
                      <th className="py-3 px-2 font-bold uppercase tracking-wider text-[9px]">Student</th>
                      <th className="py-3 px-2 font-bold uppercase tracking-wider text-[9px]">Enquiry Details</th>
                      <th className="py-3 px-2 font-bold uppercase tracking-wider text-[9px]">Target Course</th>
                      <th className="py-3 px-2 font-bold uppercase tracking-wider text-[9px]">Center Partner</th>
                      <th className="py-3 px-2 font-bold uppercase tracking-wider text-[9px]">Status Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enq) => {
                      const c = COURSES.find(item => item.id === enq.courseId);
                      const i = INSTITUTES.find(item => item.id === enq.instituteId);
                      return (
                        <tr key={enq.id} className="border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800">
                          <td className="py-3 px-2">
                            <span className="font-bold block text-slate-800 dark:text-white">{enq.studentName}</span>
                            <span className="text-[10px] text-slate-400 block">{enq.studentEmail}</span>
                            <span className="text-[10px] text-slate-400 block">{enq.studentPhone}</span>
                          </td>
                          <td className="py-3 px-2 max-w-xs truncate text-[11px] text-slate-600 dark:text-slate-300 italic">
                            "{enq.message}"
                          </td>
                          <td className="py-3 px-2 font-semibold text-slate-800 dark:text-white">{c ? c.title : enq.courseId}</td>
                          <td className="py-3 px-2">{i ? i.name : enq.instituteId}</td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                enq.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-300"
                                  : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300"
                              }`}>
                                {enq.status}
                              </span>
                              <button
                                onClick={() => updateEnquiryStatus(enq.id, enq.status === "Pending" ? "Contacted" : "Pending")}
                                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 px-2 py-1 rounded text-[9px] font-bold cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                              >
                                Toggle
                              </button>
                            </div>
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

        {activeTab === "students" && (
          <div className="space-y-4">
            <h3 className="font-poppins font-bold text-xs uppercase text-slate-400">Registered Students List</h3>
            {(!usersList || usersList.length === 0) ? (
              <p className="text-xs text-slate-500 italic">No students joined yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500">
                      <th className="py-3 px-2 font-bold uppercase tracking-wider text-[9px]">Name</th>
                      <th className="py-3 px-2 font-bold uppercase tracking-wider text-[9px]">Email</th>
                      <th className="py-3 px-2 font-bold uppercase tracking-wider text-[9px]">Role</th>
                      <th className="py-3 px-2 font-bold uppercase tracking-wider text-[9px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((u, idx) => (
                      <tr key={idx} className="border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800">
                        <td className="py-3 px-2 font-bold text-slate-800 dark:text-white">{u.name || "N/A"}</td>
                        <td className="py-3 px-2 text-slate-650 dark:text-slate-350">{u.email}</td>
                        <td className="py-3 px-2">
                          <span className="text-[9px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-800 dark:bg-indigo-950/20 dark:text-indigo-300 rounded-full">
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete ${u.name || u.email}?`)) {
                                deleteUser(u.id, u.email);
                              }
                            }}
                            className="text-red-500 hover:text-red-700 font-bold text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "institutes" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-poppins font-bold text-xs uppercase text-slate-400">Partner Allocations Matrix</h3>
              <button className="bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer">
                <Plus className="w-3.5 h-3.5" /> Add Partner
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INSTITUTES.map((inst) => (
                <div key={inst.id} className="border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 rounded-2xl p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white dark:bg-slate-900 flex items-center justify-center font-extrabold text-xs text-slate-700 dark:text-slate-200 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
                      {inst.logo}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-800 dark:text-white">{inst.name}</h4>
                      <p className="text-[10px] text-slate-500">
                        {inst.placementRate}% Placement • Students Joined: {inst.studentsTrained.toLocaleString()}+
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-slate-400 hover:text-primary p-1.5"><Edit className="w-4 h-4" /></button>
                    <button className="text-slate-400 hover:text-red-500 p-1.5"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-poppins font-bold text-xs uppercase text-slate-400">Aggregated Syllabus Programs</h3>
              <button className="bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer">
                <Plus className="w-3.5 h-3.5" /> Add Course
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COURSES.map((course) => (
                <div key={course.id} className="border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-white">{course.title}</h4>
                    <p className="text-[10px] text-slate-500">Duration: {course.duration} • Fees: ₹{course.fees.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-slate-400 hover:text-primary p-1.5"><Edit className="w-4 h-4" /></button>
                    <button className="text-slate-400 hover:text-red-500 p-1.5"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
