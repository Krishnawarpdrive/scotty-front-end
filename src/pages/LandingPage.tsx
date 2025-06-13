
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Phone, 
  Mail, 
  Trophy,
  Globe,
  Workflow
} from "lucide-react";
import { QRCodeDisplay } from "@/components/landing/QRCodeDisplay";
import { LeadCaptureForm } from "@/components/landing/LeadCaptureForm";

const LandingPage = () => {
  const { toast } = useToast();

  const features = [
    {
      icon: Trophy,
      title: "AI-Powered Matching",
      description: "Our advanced AI algorithms match candidates to roles with 95% accuracy, ensuring perfect fits every time."
    },
    {
      icon: Globe,
      title: "Global Talent Pool",
      description: "Access a worldwide network of pre-vetted professionals across all industries and skill levels."
    },
    {
      icon: Workflow,
      title: "Streamlined Process",
      description: "From sourcing to onboarding, our platform automates every step of your hiring workflow."
    }
  ];

  const handleFormSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    
    toast({
      title: "Thank you for your interest!",
      description: "Our team will contact you within 24 hours to discuss your hiring needs.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Scotty</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>sales@scotty.com</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Revolutionize Your
                <span className="text-primary block">Hiring Process</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Join thousands of companies using Scotty's AI-powered ATS to hire faster, 
                smarter, and more efficiently than ever before.
              </p>
            </div>

            {/* Value Propositions */}
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg mt-1">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Small QR Code */}
            <div className="pt-4">
              <div className="w-32">
                <QRCodeDisplay />
              </div>
            </div>
          </div>

          {/* Right Column - Lead Capture Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-background/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Request Information</CardTitle>
                <p className="text-muted-foreground">
                  Let our team show you how Scotty can transform your hiring process
                </p>
              </CardHeader>
              <CardContent>
                <LeadCaptureForm onSubmit={handleFormSubmit} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
