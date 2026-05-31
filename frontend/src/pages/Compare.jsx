import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Scale, X, Plus, Award, ShieldAlert, Star } from "lucide-react";
import { INSTITUTES } from "../data/mockData";

function Compare() {
  const [selectedIds, setSelectedIds] = useState(["sevenmentor", "qspiders"]);

  const handleAdd = (id) => {
    if (selectedIds.length >= 4) return;
    if (!selectedIds.includes(id)) {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const handleRemove = (id) => {
    setSelectedIds(prev => prev.filter(item => item !== id));
  };

  const selectedInstitutes = selectedIds.map(id => INSTITUTES.find(inst => inst.id === id)).filter(Boolean);

  const availableInstitutes = INSTITUTES.filter(inst => !selectedIds.includes(inst.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white">Compare Institutes</h1>
        <p className="text-xs text-slate-500">Select up to 4 software testing centers in Pune side-by-side to cross check fees, locations, and placement records.</p>
      </div>

      {/* Select Box Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Scale className="w-4 h-4 text-primary" />
          Manage comparison listing
        </div>

        <div className="flex flex-wrap gap-3">
          {selectedInstitutes.map((inst) => (
            <div key={inst.id} className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700">
              <span>{inst.name}</span>
              <button onClick={() => handleRemove(inst.id)} className="text-red-500 hover:text-red-700 cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {selectedIds.length < 4 && (
            <div className="relative group">
              <select
                value=""
                onChange={(e) => handleAdd(e.target.value)}
                className="bg-primary hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-xs font-semibold shadow shadow-primary/20 cursor-pointer focus:outline-none"
              >
                <option value="" disabled>+ Add Institute</option>
                {availableInstitutes.map(inst => (
                  <option key={inst.id} value={inst.id}>{inst.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Grid Table */}
      {selectedInstitutes.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-4">
          <ShieldAlert className="w-12 h-12 text-slate-400 mx-auto animate-bounce" />
          <h3 className="font-poppins font-bold text-base text-slate-800 dark:text-white">Comparison list is empty</h3>
          <p className="text-xs text-slate-500">Choose training centers above to load comparison parameters.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-55/10 dark:bg-slate-950/20">
                <th className="p-4 md:p-6 font-bold text-slate-500 uppercase tracking-wider text-[10px] w-48">Parameter</th>
                {selectedInstitutes.map((inst) => (
                  <th key={inst.id} className="p-4 md:p-6 text-slate-800 dark:text-white font-bold relative min-w-56">
                    <button
                      onClick={() => handleRemove(inst.id)}
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-500 p-1.5 cursor-pointer"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-[10px] text-slate-600 dark:text-slate-200">
                        {inst.logo}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs">{inst.name}</h4>
                        <span className="text-[9px] text-slate-400 font-normal">Rating: {inst.rating} ★</span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Placement support */}
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 md:p-6 font-semibold text-slate-400 uppercase tracking-widest text-[9px]">Placement Rate</td>
                {selectedInstitutes.map((inst) => (
                  <td key={inst.id} className="p-4 md:p-6 font-bold text-emerald-500 text-xs md:text-sm">
                    {inst.placementRate}% Placed
                  </td>
                ))}
              </tr>

              {/* Package Details */}
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 md:p-6 font-semibold text-slate-400 uppercase tracking-widest text-[9px]">Average Salary</td>
                {selectedInstitutes.map((inst) => (
                  <td key={inst.id} className="p-4 md:p-6 text-slate-800 dark:text-slate-200 font-semibold">
                    {inst.avgPackage}
                  </td>
                ))}
              </tr>

              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 md:p-6 font-semibold text-slate-400 uppercase tracking-widest text-[9px]">Highest Package</td>
                {selectedInstitutes.map((inst) => (
                  <td key={inst.id} className="p-4 md:p-6 text-primary dark:text-blue-400 font-bold">
                    {inst.highestPackage}
                  </td>
                ))}
              </tr>

              {/* Fees */}
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 md:p-6 font-semibold text-slate-400 uppercase tracking-widest text-[9px]">Estimated Fees</td>
                {selectedInstitutes.map((inst) => (
                  <td key={inst.id} className="p-4 md:p-6 text-slate-800 dark:text-slate-200">
                    {inst.feesRange}
                  </td>
                ))}
              </tr>

              {/* Course count */}
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 md:p-6 font-semibold text-slate-400 uppercase tracking-widest text-[9px]">Courses Listed</td>
                {selectedInstitutes.map((inst) => (
                  <td key={inst.id} className="p-4 md:p-6 text-slate-800 dark:text-slate-200">
                    {inst.coursesOffered.length} Programs
                  </td>
                ))}
              </tr>

              {/* Locations */}
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 md:p-6 font-semibold text-slate-400 uppercase tracking-widest text-[9px]">Center Locations</td>
                {selectedInstitutes.map((inst) => (
                  <td key={inst.id} className="p-4 md:p-6 text-slate-800 dark:text-slate-200 text-xs">
                    {inst.locations.join(", ")}
                  </td>
                ))}
              </tr>

              {/* Total Trained */}
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 md:p-6 font-semibold text-slate-400 uppercase tracking-widest text-[9px]">Trained Pool</td>
                {selectedInstitutes.map((inst) => (
                  <td key={inst.id} className="p-4 md:p-6 text-slate-800 dark:text-slate-200">
                    {inst.studentsTrained.toLocaleString()}+
                  </td>
                ))}
              </tr>

              {/* Direct Link */}
              <tr>
                <td className="p-4 md:p-6 font-semibold text-slate-400 uppercase tracking-widest text-[9px]">Action Desk</td>
                {selectedInstitutes.map((inst) => (
                  <td key={inst.id} className="p-4 md:p-6">
                    <Link
                      to={`/institutes/${inst.id}`}
                      className="bg-primary hover:bg-blue-700 text-white text-[10px] font-bold px-4 py-2 rounded-xl inline-block"
                    >
                      View Profile
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default Compare;
