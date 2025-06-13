
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SideDrawer } from '@/components/ui/side-drawer';

const certificationFormSchema = z.object({
  title: z.string().min(2, {
    message: "Certification title must be at least 2 characters.",
  }),
  domain: z.string().min(1, {
    message: "Domain is required.",
  }),
  validityPeriod: z.string().min(1, {
    message: "Validity period is required.",
  }),
  issuedBy: z.string().min(1, {
    message: "Issuing organization is required.",
  }),
  description: z.string().optional(),
});

interface CertificationFormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCertificationCreated: (certificationData: any) => void;
  certification?: any;
}

export const CertificationFormDrawer: React.FC<CertificationFormDrawerProps> = ({
  open,
  onOpenChange,
  onCertificationCreated,
  certification
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof certificationFormSchema>>({
    resolver: zodResolver(certificationFormSchema),
    defaultValues: {
      title: certification?.title || "",
      domain: certification?.domain || "",
      validityPeriod: certification?.validityPeriod || "",
      issuedBy: certification?.issuedBy || "",
      description: certification?.description || "",
    },
  });
  
  const onSubmit = async (data: z.infer<typeof certificationFormSchema>) => {
    try {
      setIsSubmitting(true);
      
      const certificationData = {
        ...data,
        status: 'active'
      };

      toast({
        title: "Success",
        description: `Certification ${data.title} ${certification ? 'updated' : 'created'} successfully.`,
      });

      onCertificationCreated(certificationData);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Certification form error:", error);
      toast({
        title: "Error",
        description: `Failed to ${certification ? 'update' : 'create'} certification. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerContent = (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        onClick={() => onOpenChange(false)}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      <Button type="submit" form="certification-form" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : certification ? "Update Certification" : "Create Certification"}
      </Button>
    </div>
  );

  return (
    <SideDrawer 
      open={open} 
      onOpenChange={onOpenChange}
      title={certification ? "Edit Certification" : "Create Certification"}
      size="lg"
      footer={footerContent}
    >
      <div className="p-6">
        <Form {...form}>
          <form id="certification-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certification Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., AWS Solutions Architect" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a domain" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cloud">Cloud Computing</SelectItem>
                      <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                      <SelectItem value="data">Data & Analytics</SelectItem>
                      <SelectItem value="project-management">Project Management</SelectItem>
                      <SelectItem value="software-development">Software Development</SelectItem>
                      <SelectItem value="networking">Networking</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="validityPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Validity Period</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select validity period" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1-year">1 Year</SelectItem>
                      <SelectItem value="2-years">2 Years</SelectItem>
                      <SelectItem value="3-years">3 Years</SelectItem>
                      <SelectItem value="lifetime">Lifetime</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issuedBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issued By</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Amazon Web Services" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe this certification and its requirements..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </SideDrawer>
  );
};

export default CertificationFormDrawer;
