
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Smartphone, ArrowRight, Zap } from "lucide-react";

export const QRCodeDisplay: React.FC = () => {
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://scotty.com";
  
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-orange-100/50 border-primary/20 shadow-lg">
      <CardContent className="p-6 text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 text-primary">
          <Smartphone className="h-5 w-5" />
          <span className="font-semibold">Scan for Mobile Access</span>
          <Zap className="h-4 w-4" />
        </div>
        
        <div className="flex justify-center">
          <div className="bg-white p-4 rounded-xl shadow-lg border border-orange-100">
            <img 
              src={qrCodeUrl}
              alt="QR Code to access Scotty"
              className="w-32 h-32 md:w-40 md:h-40 rounded-lg"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Quick Mobile Demo</p>
          <p className="text-xs text-muted-foreground">
            Experience Scotty's mobile interface instantly
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-xs text-primary bg-white/50 rounded-full px-3 py-1">
          <QrCode className="h-3 w-3" />
          <span>Point → Scan → Experience</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </CardContent>
    </Card>
  );
};
