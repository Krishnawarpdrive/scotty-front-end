
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CertificationsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Certifications</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md">Add Certification</button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Certifications Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Track and verify professional certifications for candidates and requirements.</p>
          <div className="h-64 flex items-center justify-center border rounded-md mt-4 bg-muted/20">
            <p className="text-muted-foreground">Certification database will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificationsPage;
