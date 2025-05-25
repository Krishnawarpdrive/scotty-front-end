
import React from "react";
import { Phone, MessageCircle } from "lucide-react";

export const ActionButtons: React.FC = () => {
  return (
    <div className="flex space-x-1">
      <button className="p-1 rounded hover:bg-gray-100">
        <Phone className="h-3.5 w-3.5 text-gray-500" />
      </button>
      <button className="p-1 rounded hover:bg-gray-100">
        <MessageCircle className="h-3.5 w-3.5 text-gray-500" />
      </button>
    </div>
  );
};
