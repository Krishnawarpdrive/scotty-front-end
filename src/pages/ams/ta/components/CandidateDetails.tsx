
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { X, Phone, MessageCircle, Mail, MapPin, Calendar } from "lucide-react";

interface CandidateDetailsProps {
  onClose: () => void;
}

export const CandidateDetails: React.FC<CandidateDetailsProps> = ({ onClose }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Candidate Details</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-blue-100">AS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">Aditi Sharma</h3>
              <p className="text-gray-600">Network Administrator</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2">
            <Badge className="bg-amber-100 text-amber-700">Schedule Interview</Badge>
            <span className="text-sm text-gray-500">• 2d</span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="font-medium">Contact Information</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm">+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm">aditi.sharma@email.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Mumbai, India</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-3">
          <h4 className="font-medium">Interview Progress</h4>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5, 6].map((stage) => (
              <div
                key={stage}
                className={`h-3 w-3 rounded-full ${stage <= 4 ? 'bg-green-500' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">Stage 4 of 6 - Internal Interview</p>
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          <h4 className="font-medium">Timeline</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Application Submitted</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Phone Screening Completed</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Schedule Interview</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-3">
          <h4 className="font-medium">Skills</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Network Administration</Badge>
            <Badge variant="outline">Cisco</Badge>
            <Badge variant="outline">Linux</Badge>
            <Badge variant="outline">TCP/IP</Badge>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-3">
          <h4 className="font-medium">Notes</h4>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700">
              Candidate has strong technical background with 5+ years experience in network administration. 
              Good communication skills demonstrated during phone screening.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t space-y-2">
        <div className="flex items-center space-x-2">
          <Button className="flex-1 bg-[#00A341] hover:bg-[#00A341]/90">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Interview
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex-1">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button variant="outline" className="flex-1">
            <MessageCircle className="h-4 w-4 mr-2" />
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};
