import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from "lucide-react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white">Get In Touch</h1>
        <p className="text-xs text-slate-500">Contact our regional support desk to enquire about software testing course comparisons, placement audits, or list your institute.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Contact details */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <h4 className="font-poppins font-bold text-base text-slate-900 dark:text-white">Regional Support</h4>
          <p className="text-xs text-slate-500">Feel free to call or email our Pune head office.</p>

          <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <div>
                <strong className="block text-slate-800 dark:text-white">Main Desk</strong>
                <p>Deccan Gymkhana, Shivaji Nagar, Pune, Maharashtra 411004</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <div>
                <strong className="block text-slate-800 dark:text-white">Phone Support</strong>
                <p>+91 99701 40019</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <div>
                <strong className="block text-slate-800 dark:text-white">Email Enquiries</strong>
                <p>info@testinghubpune.com</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-primary shrink-0" />
              <div>
                <strong className="block text-slate-800 dark:text-white">Working Hours</strong>
                <p>Mon - Sat: 9:00 AM to 7:00 PM IST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Contact form */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
          <h4 className="font-poppins font-bold text-base text-slate-900 dark:text-white mb-2">Send Message</h4>
          <p className="text-[10px] text-slate-500 mb-6">Fill out the quick form below, and we will get back to you shortly.</p>

          {submitted ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
              <h5 className="font-bold text-xs text-emerald-800 dark:text-emerald-300">Message Dispatched!</h5>
              <p className="text-[10px] text-slate-500">Your query has been logged. An aggregator representative will reply via email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-bold text-slate-400">Message Body</label>
                <textarea
                  rows="4"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about placement audit, course verification details..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Simulated Map Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/20 rounded-full blur-[80px]"></div>

          <div className="space-y-4 relative z-10">
            <span className="text-[9px] bg-primary/30 text-blue-300 font-bold px-2 py-0.5 rounded-md uppercase">Location Map</span>
            <h4 className="font-poppins font-bold text-base">Office coordinates</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              We are located in Deccan Gymkhana, minutes away from the Shivaji Nagar railway station.
            </p>
          </div>

          {/* Real Google Map Embed */}
          <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-800 mt-6 relative z-10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.218204683057!2d73.8427181!3d18.5186214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07a0c5cff15%3A0xedbe2488a0e8c078!2sDeccan%20Gymkhana%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1717164000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TestingHub Pune Office Location"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
