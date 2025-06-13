
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface Certification {
  id: number;
  title: string;
  domain: string;
  validityPeriod: string;
  issuedBy: string;
  description: string;
  status: string;
}

interface CertificationTableProps {
  certifications: Certification[];
  onEdit: (certification: Certification) => void;
  onDelete: (id: number) => void;
}

const CertificationTable: React.FC<CertificationTableProps> = ({
  certifications,
  onEdit,
  onDelete
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">
                Title
              </TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">
                Domain
              </TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">
                Validity Period
              </TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">
                Issued By
              </TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">
                Status
              </TableHead>
              <TableHead className="py-2 text-[12px] font-normal text-[#262626]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certifications.map((certification) => (
              <TableRow key={certification.id} className="h-12">
                <TableCell className="py-2 text-[12px] text-[#262626] font-medium">
                  {certification.title}
                </TableCell>
                <TableCell className="py-2">
                  <Badge variant="outline">{certification.domain}</Badge>
                </TableCell>
                <TableCell className="py-2 text-[12px] text-[#262626]">
                  {certification.validityPeriod}
                </TableCell>
                <TableCell className="py-2 text-[12px] text-[#262626]">
                  {certification.issuedBy}
                </TableCell>
                <TableCell className="py-2">
                  <Badge className={getStatusColor(certification.status)}>
                    {certification.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex gap-1 justify-end">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => onEdit(certification)}
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-red-600 hover:text-red-700"
                      onClick={() => onDelete(certification.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CertificationTable;
