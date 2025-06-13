
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  companyName: string;
  fullName: string;
  businessEmail: string;
  phoneNumber: string;
  companyWebsite: string;
  companyType: string;
}

interface FormErrors {
  [key: string]: string;
}

interface LeadCaptureFormProps {
  onSubmit: (data: FormData) => void;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    fullName: '',
    businessEmail: '',
    phoneNumber: '',
    companyWebsite: '',
    companyType: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const companyTypes = [
    'Startup (1-50 employees)',
    'Small Business (51-200 employees)',
    'Mid-size Company (201-1000 employees)',
    'Large Enterprise (1000+ employees)',
    'Recruitment Agency',
    'Consulting Firm',
    'Non-profit Organization',
    'Government Agency',
    'Other'
  ];

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'companyName':
        if (!value.trim()) return 'Company name is required';
        if (value.trim().length < 2) return 'Company name must be at least 2 characters';
        return '';

      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Full name must be at least 2 characters';
        if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) return 'Please enter a valid name';
        return '';

      case 'businessEmail':
        if (!value.trim()) return 'Business email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
        // Check for personal email domains
        const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
        const domain = value.trim().split('@')[1]?.toLowerCase();
        if (personalDomains.includes(domain)) {
          return 'Please use your business email address';
        }
        return '';

      case 'phoneNumber':
        if (!value.trim()) return 'Phone number is required';
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = value.replace(/[\s\-\(\)\.]/g, '');
        if (!phoneRegex.test(cleanPhone)) return 'Please enter a valid phone number';
        return '';

      case 'companyWebsite':
        if (!value.trim()) return 'Company website is required';
        try {
          const url = value.startsWith('http') ? value : `https://${value}`;
          new URL(url);
          return '';
        } catch {
          return 'Please enter a valid website URL';
        }

      case 'companyType':
        if (!value) return 'Please select your company type';
        return '';

      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation for touched fields
    if (touchedFields.has(name)) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string) => {
    setTouchedFields(prev => new Set(prev).add(name));
    const error = validateField(name, formData[name as keyof FormData]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouchedFields(new Set(Object.keys(formData)));
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSubmit(formData);
      
      // Reset form
      setFormData({
        companyName: '',
        fullName: '',
        businessEmail: '',
        phoneNumber: '',
        companyWebsite: '',
        companyType: ''
      });
      setErrors({});
      setTouchedFields(new Set());
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldStatus = (fieldName: string) => {
    const hasError = errors[fieldName];
    const isTouched = touchedFields.has(fieldName);
    const hasValue = formData[fieldName as keyof FormData];
    
    if (hasError && isTouched) return 'error';
    if (!hasError && isTouched && hasValue) return 'success';
    return 'default';
  };

  const renderFieldIcon = (fieldName: string) => {
    const status = getFieldStatus(fieldName);
    if (status === 'success') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === 'error') return <AlertCircle className="h-4 w-4 text-destructive" />;
    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Company Name and Full Name - Two Column Layout */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <div className="relative">
            <Input
              id="companyName"
              type="text"
              placeholder="Company name"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              onBlur={() => handleBlur('companyName')}
              className={`pr-10 ${getFieldStatus('companyName') === 'error' ? 'border-destructive' : 
                getFieldStatus('companyName') === 'success' ? 'border-green-500' : ''}`}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {renderFieldIcon('companyName')}
            </div>
          </div>
          {errors.companyName && (
            <p className="text-xs text-destructive">{errors.companyName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <div className="relative">
            <Input
              id="fullName"
              type="text"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              onBlur={() => handleBlur('fullName')}
              className={`pr-10 ${getFieldStatus('fullName') === 'error' ? 'border-destructive' : 
                getFieldStatus('fullName') === 'success' ? 'border-green-500' : ''}`}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {renderFieldIcon('fullName')}
            </div>
          </div>
          {errors.fullName && (
            <p className="text-xs text-destructive">{errors.fullName}</p>
          )}
        </div>
      </div>

      {/* Business Email */}
      <div className="space-y-2">
        <Label htmlFor="businessEmail">Business Email *</Label>
        <div className="relative">
          <Input
            id="businessEmail"
            type="email"
            placeholder="your.email@company.com"
            value={formData.businessEmail}
            onChange={(e) => handleInputChange('businessEmail', e.target.value)}
            onBlur={() => handleBlur('businessEmail')}
            className={`pr-10 ${getFieldStatus('businessEmail') === 'error' ? 'border-destructive' : 
              getFieldStatus('businessEmail') === 'success' ? 'border-green-500' : ''}`}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {renderFieldIcon('businessEmail')}
          </div>
        </div>
        {errors.businessEmail && (
          <p className="text-sm text-destructive">{errors.businessEmail}</p>
        )}
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number *</Label>
        <div className="relative">
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            onBlur={() => handleBlur('phoneNumber')}
            className={`pr-10 ${getFieldStatus('phoneNumber') === 'error' ? 'border-destructive' : 
              getFieldStatus('phoneNumber') === 'success' ? 'border-green-500' : ''}`}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {renderFieldIcon('phoneNumber')}
          </div>
        </div>
        {errors.phoneNumber && (
          <p className="text-sm text-destructive">{errors.phoneNumber}</p>
        )}
      </div>

      {/* Company Website */}
      <div className="space-y-2">
        <Label htmlFor="companyWebsite">Company Website *</Label>
        <div className="relative">
          <Input
            id="companyWebsite"
            type="url"
            placeholder="www.yourcompany.com"
            value={formData.companyWebsite}
            onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
            onBlur={() => handleBlur('companyWebsite')}
            className={`pr-10 ${getFieldStatus('companyWebsite') === 'error' ? 'border-destructive' : 
              getFieldStatus('companyWebsite') === 'success' ? 'border-green-500' : ''}`}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {renderFieldIcon('companyWebsite')}
          </div>
        </div>
        {errors.companyWebsite && (
          <p className="text-sm text-destructive">{errors.companyWebsite}</p>
        )}
      </div>

      {/* Company Type */}
      <div className="space-y-2">
        <Label htmlFor="companyType">Type of Company *</Label>
        <Select
          value={formData.companyType}
          onValueChange={(value) => handleInputChange('companyType', value)}
        >
          <SelectTrigger className={getFieldStatus('companyType') === 'error' ? 'border-destructive' : 
            getFieldStatus('companyType') === 'success' ? 'border-green-500' : ''}>
            <SelectValue placeholder="Select your company type" />
          </SelectTrigger>
          <SelectContent>
            {companyTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.companyType && (
          <p className="text-sm text-destructive">{errors.companyType}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full h-12 text-base font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting Request...
          </>
        ) : (
          'Request Information'
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By submitting this form, you agree to our Privacy Policy and Terms of Service.
        No spam, unsubscribe anytime.
      </p>
    </form>
  );
};
