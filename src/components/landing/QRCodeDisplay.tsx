
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Smartphone } from "lucide-react";

export const QRCodeDisplay: React.FC = () => {
  // QR code to point to Scotty landing page
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://scotty.com";
  
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardContent className="p-4 text-center space-y-3">
        <div className="flex items-center justify-center space-x-1 text-primary text-sm">
          <Smartphone className="h-4 w-4" />
          <span className="font-medium">Mobile Access</span>
        </div>
        
        <div className="flex justify-center">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <img 
              src={qrCodeUrl}
              alt="QR Code to access Scotty"
              className="w-20 h-20"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-1 text-xs text-primary">
          <QrCode className="h-3 w-3" />
          <span>Scan to visit Scotty</span>
        </div>
      </CardContent>
    </Card>
  );
};
