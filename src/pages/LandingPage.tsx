
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  Users, 
  Clock, 
  Shield, 
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
          </div>

          {/* Right Column - Form & QR Code */}
          <div className="space-y-8">
            {/* Lead Capture Form */}
            <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-sm">
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

            {/* QR Code Section */}
            <QRCodeDisplay />
          </div>
        </div>
      </section>

      {/* Contact Information Footer */}
      <footer className="bg-muted/50 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center justify-center md:justify-start space-x-2">
                <Phone className="h-4 w-4" />
                <span>Phone Support</span>
              </h3>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
              <p className="text-sm text-muted-foreground">Available 24/7</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center justify-center md:justify-start space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email Us</span>
              </h3>
              <p className="text-muted-foreground">sales@scotty.com</p>
              <p className="text-sm text-muted-foreground">Response within 2 hours</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center justify-center md:justify-start space-x-2">
                <Clock className="h-4 w-4" />
                <span>Business Hours</span>
              </h3>
              <p className="text-muted-foreground">Mon-Fri: 9AM-6PM EST</p>
              <p className="text-sm text-muted-foreground">Weekend support available</p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Scotty. All rights reserved. | 
              <span className="ml-2">Privacy Policy | Terms of Service</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
