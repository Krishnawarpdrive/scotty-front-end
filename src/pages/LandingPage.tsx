
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  Users, 
  Clock, 
  Shield, 
  Phone, 
  Mail, 
  MapPin,
  Menu,
  X,
  Zap,
  Target,
  Globe,
  Trophy,
  ArrowRight,
  Play
} from "lucide-react";
import { QRCodeDisplay } from "@/components/landing/QRCodeDisplay";
import { LeadCaptureForm } from "@/components/landing/LeadCaptureForm";

const LandingPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Zap,
      title: "Lightning-Fast Hiring",
      description: "Reduce time-to-hire by 60% with AI-powered candidate matching and automated workflows"
    },
    {
      icon: Target,
      title: "Precision Matching", 
      description: "Our AI analyzes thousands of data points to find the perfect candidate-role fit every time"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with SOC 2 compliance and comprehensive audit trails"
    }
  ];

  const benefits = [
    "Cut hiring time by 60% on average",
    "Improve candidate quality with AI matching",
    "Reduce cost-per-hire significantly", 
    "Scale your hiring operations seamlessly",
    "Eliminate bias with data-driven decisions",
    "Integrate with 100+ HR tools seamlessly"
  ];

  const stats = [
    { number: "2,500+", label: "Companies Trust Scotty" },
    { number: "60%", label: "Faster Hiring Process" },
    { number: "95%", label: "Client Satisfaction Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  const handleFormSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    
    toast({
      title: "Thank you for your interest!",
      description: "Our team will contact you within 24 hours to discuss your hiring needs.",
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Enhanced Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">Scotty</span>
                <div className="text-xs text-muted-foreground">AI-Powered ATS</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
              <Button variant="outline" size="sm">Sign In</Button>
              <Button size="sm" className="gradient-bg shadow-lg">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-orange-100">
              <nav className="flex flex-col space-y-4 pt-4">
                <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
                <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm">Sign In</Button>
                  <Button size="sm" className="gradient-bg">Get Started</Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge className="w-fit bg-orange-100 text-primary border-orange-200">
                <Trophy className="h-3 w-3 mr-1" />
                Trusted by 2,500+ Companies
              </Badge>
              
              <h1 className="text-gradient">
                Transform Your Hiring with AI-Powered Intelligence
              </h1>
              
              <p className="text-body-lg text-gray-600 max-w-lg">
                Join thousands of companies using Scotty's revolutionary ATS to hire faster, 
                smarter, and more efficiently than ever before. Experience the future of recruitment.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gradient-bg shadow-xl text-lg px-8">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Column - Enhanced Form & QR */}
          <div className="space-y-6">
            {/* Tab Mode Implementation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="overview">Quick Overview</TabsTrigger>
                <TabsTrigger value="contact">Get Started</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Features Overview */}
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-center">Why Choose Scotty?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-3">Key Benefits</h4>
                      <div className="grid gap-2">
                        {benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={() => setActiveTab('contact')} 
                      className="w-full gradient-bg shadow-lg"
                      size="lg"
                    >
                      Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                {/* Enhanced Lead Capture Form */}
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
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
              </TabsContent>
            </Tabs>

            {/* QR Code Section */}
            <QRCodeDisplay />
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 py-12">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-orange-600 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Scotty</span>
              </div>
              <p className="text-sm text-gray-600">
                The future of AI-powered recruitment. Transform your hiring process with intelligent automation.
              </p>
              <div className="flex space-x-4">
                <Globe className="h-5 w-5 text-gray-400" />
                <Trophy className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">+1 (555) 123-4567</p>
                    <p className="text-xs text-gray-500">Available 24/7</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">sales@scotty.com</p>
                    <p className="text-xs text-gray-500">Response within 2 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm">Mon-Fri: 9AM-6PM EST</span>
                </div>
                <p className="text-xs text-gray-500">Weekend support available</p>
                <p className="text-xs text-gray-500">Emergency support 24/7</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Quick Links</h3>
              <div className="grid gap-2">
                <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">Product Demo</a>
                <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">Pricing Plans</a>
                <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">Customer Stories</a>
                <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">API Documentation</a>
              </div>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-500">
                © 2024 Scotty Technologies, Inc. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
