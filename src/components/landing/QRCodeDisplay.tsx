
import React from 'react';
import { QrCode, Smartphone, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const QRCodeDisplay: React.FC = () => {
  // QR code to point to Scotty landing page
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://scotty.com";
  
  const handleContactClick = () => {
    window.open('tel:+15551234567', '_self');
  };
  
  return (
    <div className="flex items-center space-x-4">
      {/* QR Code */}
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-1 text-primary text-xs">
          <Smartphone className="h-3 w-3" />
          <span className="font-medium">Quick Access</span>
        </div>
        
        <img 
          src={qrCodeUrl}
          alt="QR Code to access Scotty"
          className="w-16 h-16"
        />
        
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <QrCode className="h-3 w-3" />
          <span>Scan to visit</span>
        </div>
      </div>
      
      {/* Contact CTA */}
      <div className="flex flex-col space-y-2">
        <Button 
          onClick={handleContactClick}
          size="sm"
          className="flex items-center space-x-2"
        >
          <Phone className="h-4 w-4" />
          <span>Call Now</span>
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Talk to an expert
        </p>
      </div>
    </div>
  );
};
