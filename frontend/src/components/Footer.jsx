import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, Shield, Globe, Award } from "lucide-react";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary to-emerald-500 flex items-center justify-center text-white font-bold text-base shadow">
                TH
              </div>
              <span className="font-poppins font-extrabold text-md tracking-wider text-white">
                TESTING<span className="text-primary">HUB</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Pune's leading platform to compare software testing syllabus, placement data, fees, and training quality. Helping students land high-paying QA engineer roles.
            </p>
            <div className="flex gap-4">
              <Globe className="w-4 h-4 text-slate-500 hover:text-white transition-colors cursor-pointer" />
              <Shield className="w-4 h-4 text-slate-500 hover:text-white transition-colors cursor-pointer" />
              <Award className="w-4 h-4 text-slate-500 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h5 className="font-poppins font-semibold text-white text-sm mb-4">Quick Links</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/courses" className="hover:text-primary transition-colors">Software Testing Courses</Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-primary transition-colors">Compare Institutes</Link>
              </li>
              <li>
                <Link to="/placements" className="hover:text-primary transition-colors">Recent Placements</Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-primary transition-colors">Blog Articles</Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-primary transition-colors">Student Reviews</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h5 className="font-poppins font-semibold text-white text-sm mb-4">Contact Desk</h5>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Deccan Gymkhana, Shivaji Nagar, Pune, Maharashtra 411004</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+91 99701 40019</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>info@testinghubpune.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-4">
            <h5 className="font-poppins font-semibold text-white text-sm">Newsletter</h5>
            <p className="text-xs leading-relaxed text-slate-400">
              Subscribe to get placement drive notifications, interview checklists, and course discount coupons directly in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-blue-700 text-white px-3 py-2 rounded-xl flex items-center justify-center cursor-pointer transition-colors shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            {subscribed && (
              <p className="text-[10px] text-emerald-400">Subscribed successfully! Thank you.</p>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-[10px] text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} TestingHub Pune. All rights reserved. Built with pride for QA Engineers in Pune.</p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:underline">Privacy Policy</span>
            <span className="cursor-pointer hover:underline">Terms of Service</span>
            <span className="cursor-pointer hover:underline">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
