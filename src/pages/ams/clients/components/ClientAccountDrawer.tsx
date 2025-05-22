
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Simplified form schema for client creation
const formSchema = z.object({
  name: z.string().min(1, { message: "Client name is required" }),
  contact: z.string().min(1, { message: "Contact person is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  accountType: z.string().min(1, { message: "Account type is required" }),
  assignedHR: z.string().min(1, { message: "Assigned HR is required" }),
  clientTier: z.string().min(1, { message: "Client tier is required" }),
  status: z.string().min(1, { message: "Status is required" }),
});

type FormValues = z.infer<typeof formSchema>;

interface ClientAccountDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClientCreated?: (client: any) => void;
}

const ClientAccountDrawer: React.FC<ClientAccountDrawerProps> = ({
  open,
  onOpenChange,
  onClientCreated
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      contact: '',
      email: '',
      accountType: 'Enterprise',
      assignedHR: 'Sarah Lee',
      clientTier: 'A',
      status: 'active',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Create client in Supabase
      const { data, error } = await supabase
        .from('clients')
        .insert([
          {
            name: values.name,
            contact: values.contact,
            email: values.email,
            account_type: values.accountType,
            assigned_hr: values.assignedHR,
            client_tier: values.clientTier,
            status: values.status,
            health_score: 100, // Default values
            budget_utilized: 0,
            total_requirements: 0,
            hiring_status: 'Active'
          }
        ])
        .select();

      if (error) throw error;
      
      // Format the client data for the callback
      const createdClient = {
        id: data[0].id,
        name: data[0].name,
        contact: data[0].contact,
        email: data[0].email,
        status: data[0].status,
        accountType: data[0].account_type,
        createdOn: data[0].created_on,
        lastActivity: { days: 0, active: true },
        roles: [],
        totalRequirements: data[0].total_requirements,
        assignedHR: data[0].assigned_hr,
        hiringStatus: data[0].hiring_status,
        clientTier: data[0].client_tier,
        healthScore: data[0].health_score,
        budgetUtilized: data[0].budget_utilized,
        notes: data[0].notes
      };
      
      // Notify parent component about successful client creation
      if (onClientCreated) {
        onClientCreated(createdClient);
      }
      
      toast({
        title: 'Success!',
        description: `Client ${values.name} has been created successfully.`,
      });
      
      // Reset form
      form.reset();
      
      // Close drawer
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating client:', error);
      toast({
        title: 'Error',
        description: 'Failed to create client. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Add New Client</SheetTitle>
          <SheetDescription>
            Create a new client account in your system.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Corporation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@acme.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Enterprise">Enterprise</SelectItem>
                      <SelectItem value="SMB">SMB</SelectItem>
                      <SelectItem value="Startup">Startup</SelectItem>
                      <SelectItem value="Government">Government</SelectItem>
                      <SelectItem value="Non-Profit">Non-Profit</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assignedHR"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned HR</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select HR representative" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Sarah Lee">Sarah Lee</SelectItem>
                      <SelectItem value="Mike Chen">Mike Chen</SelectItem>
                      <SelectItem value="Anna Smith">Anna Smith</SelectItem>
                      <SelectItem value="David Rodriguez">David Rodriguez</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientTier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Tier</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select client tier" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A">Tier A</SelectItem>
                      <SelectItem value="B">Tier B</SelectItem>
                      <SelectItem value="C">Tier C</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-1"></div>
                    Creating...
                  </>
                ) : (
                  'Create Client'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default ClientAccountDrawer;
