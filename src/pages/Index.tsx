
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to AMS</h1>
        <p className="text-xl text-gray-600">Applicant Management System</p>
        <div className="pt-4">
          <Button asChild size="lg">
            <Link to="/ams/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
