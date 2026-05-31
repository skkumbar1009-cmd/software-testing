import React, { useState } from "react";
import { MessageSquare, X, Send, Award, BookOpen, MapPin } from "lucide-react";

function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Welcome to TestingHub Pune! How can I help you jumpstart your career in Software Testing today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [interest, setInterest] = useState(null);
  const [step, setStep] = useState("greet"); // greet, ask_email

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const userMsg = { id: Date.now(), sender: "user", text: userText };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let botText = "";
      const cleanInput = userText.toLowerCase();

      if (step === "greet") {
        if (cleanInput.includes("fees") || cleanInput.includes("price") || cleanInput.includes("cost")) {
          botText = "Fees range from ₹12,000 for Manual Testing up to ₹28,000 for our full Automation Masterclass. Would you like our coordinator to email you the complete syllabus & discount brochure? Please type your email address.";
          setInterest("Fees & Pricing");
          setStep("ask_email");
        } else if (cleanInput.includes("placement") || cleanInput.includes("job") || cleanInput.includes("hiring")) {
          botText = "Pune institutes like QSpiders & TestoMeter have 91%-92% placement rates, with average starting packages around 4.6 LPA. Would you like us to email you the placement report & hiring partner list? Please type your email address.";
          setInterest("Placements Report");
          setStep("ask_email");
        } else if (cleanInput.includes("location") || cleanInput.includes("pune") || cleanInput.includes("where")) {
          botText = "Most premium institutes are situated in Shivaji Nagar, Deccan, Kothrud, and Hinjewadi. Would you like a list of centers near your area? Please type your email address.";
          setInterest("Locations List");
          setStep("ask_email");
        } else if (cleanInput.includes("selenium") || cleanInput.includes("automation") || cleanInput.includes("java")) {
          botText = "Automation Testing using Selenium + Java/Python is our top trending course. Would you like the complete batch schedule and syllabus structure emailed to you? Please type your email address.";
          setInterest("Automation Testing Syllabus");
          setStep("ask_email");
        } else {
          botText = "Thanks for reaching out! To give you accurate details, could you tell me which software testing topic (e.g. Manual, Selenium Automation, API Testing) you are interested in? Or just drop your email address to speak with a counselor.";
          setInterest("General Enquiry");
          setStep("ask_email");
        }
      } else if (step === "ask_email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(userText)) {
          // Store lead details in local storage
          const leads = JSON.parse(localStorage.getItem("th_leads") || "[]");
          leads.push({ email: userText, interest, date: new Date().toISOString() });
          localStorage.setItem("th_leads", JSON.stringify(leads));

          botText = `Thank you! I've registered your interest for "${interest || "General Enquiry"}" and queued the PDF brochure to ${userText}. A regional coordinator will contact you shortly via WhatsApp or email. Is there anything else you'd like to ask?`;
          setStep("greet");
          setInterest(null);
        } else {
          botText = "That doesn't look like a valid email address. Please type a valid email (e.g., student@email.com) so we can send you the brochure.";
        }
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: "bot", text: botText }]);
      setIsTyping(false);
    }, 1200);
  };

  const handlePredefined = (text) => {
    const userMsg = { id: Date.now(), sender: "user", text: text };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let botText = "";
      const cleanInput = text.toLowerCase();
      let nextStep = "ask_email";
      let nextInterest = "";

      if (cleanInput.includes("fees") || cleanInput.includes("price") || cleanInput.includes("cost")) {
        botText = "Fees range from ₹12,000 for Manual Testing up to ₹28,000 for our full Automation Masterclass. Would you like our coordinator to email you the complete syllabus & discount brochure? Please type your email address.";
        nextInterest = "Fees & Pricing";
      } else if (cleanInput.includes("placement") || cleanInput.includes("job") || cleanInput.includes("hiring")) {
        botText = "Pune institutes like QSpiders & TestoMeter have 91%-92% placement rates, with average starting packages around 4.6 LPA. Would you like us to email you the placement report & hiring partner list? Please type your email address.";
        nextInterest = "Placements Report";
      } else if (cleanInput.includes("location") || cleanInput.includes("pune") || cleanInput.includes("where")) {
        botText = "Most premium institutes are situated in Shivaji Nagar, Deccan, Kothrud, and Hinjewadi. Would you like a list of centers near your area? Please type your email address.";
        nextInterest = "Locations List";
      } else {
        botText = "Thank you! Please enter your email address so we can forward your enquiry to our regional advisor.";
        nextInterest = "General Enquiry";
      }

      setInterest(nextInterest);
      setStep(nextStep);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: "bot", text: botText }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer focus:outline-none"
        >
          <MessageSquare className="w-6 h-6 animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 md:w-96 h-[480px] rounded-2xl glass-panel shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 transform scale-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-blue-700 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">TH</div>
              <div>
                <h4 className="font-semibold text-sm">TestingHub Support</h4>
                <p className="text-[10px] text-emerald-200">Online & Ready</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 no-scrollbar dark:bg-slate-900/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-primary text-white rounded-tr-none"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-200/50 dark:border-slate-700/50"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-2xl rounded-tl-none px-4 py-2 text-xs flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          <div className="p-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handlePredefined("What are the course fees?")}
              className="text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-3 py-1 cursor-pointer whitespace-nowrap dark:text-slate-300"
            >
              Course Fees?
            </button>
            <button
              onClick={() => handlePredefined("Tell me about placement guarantee")}
              className="text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-3 py-1 cursor-pointer whitespace-nowrap dark:text-slate-300"
            >
              Placements?
            </button>
            <button
              onClick={() => handlePredefined("Where are the training centers located?")}
              className="text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-3 py-1 cursor-pointer whitespace-nowrap dark:text-slate-300"
            >
              Locations?
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2 items-center bg-white dark:bg-slate-900">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about testing courses..."
              className="flex-1 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary bg-slate-50 dark:bg-slate-950 dark:text-white"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-blue-700 text-white p-2 rounded-xl cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default LiveChat;
