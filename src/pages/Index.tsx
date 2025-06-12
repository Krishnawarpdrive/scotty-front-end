
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MainNavigation } from "@/components/navigation/MainNavigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Welcome to AMS</h1>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive Applicant Management System for modern hiring teams
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Button asChild size="lg" className="w-full">
              <Link to="/ams/dashboard">AMS Dashboard</Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="w-full">
              <Link to="/ams/candidate/dashboard">Candidate Portal</Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="w-full">
              <Link to="/ams/clients">Manage Clients</Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="w-full">
              <Link to="/ams/roles-library">Roles Library</Link>
            </Button>
          </div>
          
          <div className="pt-8 border-t mt-12">
            <p className="text-sm text-gray-500 mb-4">Quick Access</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="ghost" size="sm">
                <Link to="/profile">Profile</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/settings">Settings</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/support">Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
