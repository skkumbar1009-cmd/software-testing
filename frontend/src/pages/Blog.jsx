import React, { useState } from "react";
import { BLOGS } from "../data/mockData";
import { BookOpen, Calendar, Clock, ArrowRight, Tag, Search, ShieldCheck } from "lucide-react";

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Manual Testing", "Selenium", "API Testing", "Automation Testing", "Career Guidance", "Interview Questions"];

  const filteredBlogs = BLOGS.filter((blog) => {
    const matchCat = selectedCategory === "All" || blog.category === selectedCategory;
    const matchSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white">Blogs & Career Guides</h1>
        <p className="text-xs text-slate-500">Read software testing industry updates, Selenium automation tutorials, and interview prep guides.</p>
      </div>

      {/* Categories Bar & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-white"
          />
        </div>

        {/* Categories Scroller */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[10px] uppercase font-bold px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto animate-pulse" />
          <h3 className="font-poppins font-bold text-base text-slate-800 dark:text-white">No articles match your selection</h3>
          <p className="text-xs text-slate-500">Try browsing another category or adjusting your search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <article key={blog.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover-lift flex flex-col justify-between group">
              <div className="space-y-4">
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 text-[9px] bg-primary text-white font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
                    {blog.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex gap-4 text-[9px] text-slate-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTime}
                    </span>
                  </div>
                  <h4 className="font-poppins font-bold text-base text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors">
                    {blog.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              {/* Action desk */}
              <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 mt-6">
                <button className="text-xs font-bold text-primary flex items-center gap-1 group/btn hover:underline cursor-pointer">
                  Read Full Guide
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;
