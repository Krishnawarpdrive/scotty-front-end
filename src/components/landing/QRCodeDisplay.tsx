
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Smartphone, ArrowRight } from "lucide-react";

export const QRCodeDisplay: React.FC = () => {
  // In a real implementation, you would generate this QR code to point to your landing page
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://yourlandingpage.com";
  
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardContent className="p-6 text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 text-primary">
          <Smartphone className="h-5 w-5" />
          <span className="font-semibold">Scan for Mobile Access</span>
        </div>
        
        <div className="flex justify-center">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <img 
              src={qrCodeUrl}
              alt="QR Code to access AMS Pro landing page"
              className="w-32 h-32 md:w-40 md:h-40"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Quick Mobile Demo</p>
          <p className="text-xs text-muted-foreground">
            Scan to view our mobile-optimized demo and book a call instantly
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-xs text-primary">
          <QrCode className="h-3 w-3" />
          <span>Point camera → Scan → Demo</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </CardContent>
    </Card>
  );
};
