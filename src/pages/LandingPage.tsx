
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  Users, 
  Clock, 
  Shield, 
  Phone, 
  Mail, 
  MapPin,
  ArrowRight,
  Star
} from "lucide-react";
import { QRCodeDisplay } from "@/components/landing/QRCodeDisplay";
import { LeadCaptureForm } from "@/components/landing/LeadCaptureForm";

const LandingPage = () => {
  const { toast } = useToast();

  const features = [
    {
      icon: Users,
      title: "Streamlined Hiring",
      description: "Reduce time-to-hire by 60% with our intelligent candidate matching"
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Automate repetitive tasks and focus on what matters most"
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Enterprise-grade security with full compliance support"
    }
  ];

  const testimonials = [
    {
      company: "TechCorp Inc.",
      quote: "Reduced our hiring time by 50% and improved candidate quality significantly.",
      rating: 5
    },
    {
      company: "StartupXYZ",
      quote: "The best ATS investment we've made. ROI was evident within the first month.",
      rating: 5
    }
  ];

  const handleFormSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    
    toast({
      title: "Thank you for your interest!",
      description: "Our team will contact you within 24 hours to schedule a personalized demo.",
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
            <span className="text-xl font-bold">AMS Pro</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>sales@amspro.com</span>
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
              <Badge className="w-fit">
                #1 Rated ATS Solution
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Transform Your
                <span className="text-primary block">Hiring Process</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Join 2,500+ companies using our AI-powered ATS to hire faster, 
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

            {/* Social Proof */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium">4.9/5 from 500+ reviews</span>
              </div>
              
              <div className="space-y-3">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{testimonial.company}</span>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Form & QR Code */}
          <div className="space-y-8">
            {/* Lead Capture Form */}
            <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Get Your Free Demo</CardTitle>
                <p className="text-muted-foreground">
                  See how AMS Pro can transform your hiring in just 15 minutes
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
              <p className="text-muted-foreground">sales@amspro.com</p>
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
              © 2024 AMS Pro. All rights reserved. | 
              <span className="ml-2">Privacy Policy | Terms of Service</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
