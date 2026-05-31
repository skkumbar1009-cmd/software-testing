import React from "react";
import { MessageSquare } from "lucide-react";

function WhatsAppButton() {
  const handleClick = () => {
    // Simulated WhatsApp API link (TestingHub Pune WhatsApp business placeholder)
    window.open("https://wa.me/919970140019?text=Hi%2C%20I'm%20interested%20in%20Software%20Testing%20courses%20in%20Pune.", "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 group focus:outline-none"
      title="Chat on WhatsApp"
    >
      <MessageSquare className="w-6 h-6 animate-pulse group-hover:scale-105" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-medium text-sm transition-all duration-300 group-hover:max-w-xs group-hover:ml-2">
        WhatsApp Enquiry
      </span>
    </button>
  );
}

export default WhatsAppButton;
