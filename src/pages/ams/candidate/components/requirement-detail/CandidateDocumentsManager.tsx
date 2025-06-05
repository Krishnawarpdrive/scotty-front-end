
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Upload, 
  Eye, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  File
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'uploaded' | 'pending' | 'approved' | 'rejected' | 'expired';
  uploadedDate?: string;
  expiryDate?: string;
  size?: string;
  downloadUrl?: string;
  feedback?: string;
  isRequired: boolean;
}

interface CandidateDocumentsManagerProps {
  documents: Document[];
  onUpload: (documentType: string) => void;
  onDownload: (documentId: string) => void;
  onView: (documentId: string) => void;
}

export const CandidateDocumentsManager: React.FC<CandidateDocumentsManagerProps> = ({
  documents,
  onUpload,
  onDownload,
  onView
}) => {
  const [uploadingType, setUploadingType] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Approved</Badge>;
      case 'uploaded':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Under Review</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>;
      case 'expired':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-300">Expired</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Pending Upload</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
      case 'expired':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <File className="h-4 w-4 text-gray-600" />;
    }
  };

  const requiredDocuments = documents.filter(doc => doc.isRequired);
  const optionalDocuments = documents.filter(doc => !doc.isRequired);
  const completedRequired = requiredDocuments.filter(doc => doc.status === 'approved').length;

  const handleUpload = (documentType: string) => {
    setUploadingType(documentType);
    onUpload(documentType);
    // Reset uploading state after a short delay (in real app, this would be handled by the upload completion)
    setTimeout(() => setUploadingType(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Documents Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Documents & Verification</CardTitle>
            <Badge variant="secondary">
              {completedRequired}/{requiredDocuments.length} Required Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{documents.length}</div>
              <div className="text-sm text-blue-700">Total Documents</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {documents.filter(d => d.status === 'approved').length}
              </div>
              <div className="text-sm text-green-700">Approved</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {documents.filter(d => d.status === 'pending' || d.status === 'uploaded').length}
              </div>
              <div className="text-sm text-orange-700">Under Review</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Required Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Required Documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requiredDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(doc.status)}
                  <div>
                    <h4 className="font-medium text-gray-900">{doc.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      {doc.uploadedDate && (
                        <span>Uploaded: {doc.uploadedDate}</span>
                      )}
                      {doc.expiryDate && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Expires: {doc.expiryDate}</span>
                        </div>
                      )}
                      {doc.size && <span>{doc.size}</span>}
                    </div>
                    {doc.feedback && doc.status === 'rejected' && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                        <strong>Feedback:</strong> {doc.feedback}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {getStatusBadge(doc.status)}
                  
                  <div className="flex space-x-2">
                    {doc.status === 'pending' || doc.status === 'rejected' || doc.status === 'expired' ? (
                      <Button
                        size="sm"
                        onClick={() => handleUpload(doc.type)}
                        disabled={uploadingType === doc.type}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {uploadingType === doc.type ? 'Uploading...' : 'Upload'}
                      </Button>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onView(doc.id)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onDownload(doc.id)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optional Documents */}
      {optionalDocuments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <FileText className="h-5 w-5 text-gray-600" />
              <span>Optional Documents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {optionalDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(doc.status)}
                    <div>
                      <h4 className="font-medium text-gray-900">{doc.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        {doc.uploadedDate && (
                          <span>Uploaded: {doc.uploadedDate}</span>
                        )}
                        {doc.size && <span>{doc.size}</span>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(doc.status)}
                    
                    <div className="flex space-x-2">
                      {doc.status === 'pending' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpload(doc.type)}
                          disabled={uploadingType === doc.type}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {uploadingType === doc.type ? 'Uploading...' : 'Upload'}
                        </Button>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onView(doc.id)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onDownload(doc.id)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
