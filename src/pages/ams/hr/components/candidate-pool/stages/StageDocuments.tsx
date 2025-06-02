
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Upload, 
  File, 
  FileText, 
  Image, 
  Download, 
  Eye, 
  Trash2,
  Plus
} from 'lucide-react';
import { CandidateStageData, UserRole, CandidateDocument } from '../types/CandidateStageTypes';

interface StageDocumentsProps {
  candidate: any;
  candidateStageData: CandidateStageData;
  userRole: UserRole;
  stageId: string;
  tabId: string;
}

export const StageDocuments: React.FC<StageDocumentsProps> = ({
  candidate,
  candidateStageData,
  userRole,
  stageId
}) => {
  const [selectedDocumentType, setSelectedDocumentType] = useState<'resume' | 'cover_letter' | 'portfolio' | 'assessment' | 'feedback' | 'other'>('other');

  // Mock documents data
  const [documents, setDocuments] = useState<CandidateDocument[]>([
    {
      id: '1',
      name: 'Resume_Sarah_Johnson.pdf',
      type: 'resume',
      url: '#',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: '2024-01-15T09:00:00Z'
    },
    {
      id: '2',
      name: 'Cover_Letter.pdf',
      type: 'cover_letter',
      url: '#',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: '2024-01-15T09:05:00Z'
    },
    {
      id: '3',
      name: 'Portfolio_Screenshots.zip',
      type: 'portfolio',
      url: '#',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: '2024-01-15T09:10:00Z'
    },
    {
      id: '4',
      name: 'Phone_Screening_Notes.pdf',
      type: 'feedback',
      url: '#',
      uploadedBy: 'Sarah Chen (HR)',
      uploadedAt: '2024-01-16T11:30:00Z',
      stageId: 'phone-screening'
    }
  ]);

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'resume':
      case 'cover_letter':
      case 'feedback':
        return <FileText className="h-5 w-5" />;
      case 'portfolio':
        return <Image className="h-5 w-5" />;
      case 'assessment':
        return <File className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case 'resume': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cover_letter': return 'bg-green-100 text-green-800 border-green-200';
      case 'portfolio': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'assessment': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'feedback': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const formatFileSize = (url: string) => {
    // Mock file size calculation
    return '2.4 MB';
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const newDocument: CandidateDocument = {
        id: Date.now().toString() + Math.random().toString(),
        name: file.name,
        type: selectedDocumentType,
        url: URL.createObjectURL(file), // In real app, upload to server
        uploadedBy: 'Current User', // Replace with actual user
        uploadedAt: new Date().toISOString(),
        stageId: stageId
      };

      setDocuments(prev => [newDocument, ...prev]);
    });

    // Reset input
    event.target.value = '';
  };

  const handleDeleteDocument = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  const stageDocuments = documents.filter(doc => doc.stageId === stageId);
  const generalDocuments = documents.filter(doc => !doc.stageId);

  const canUpload = userRole === 'hr' || userRole === 'ta' || userRole === 'interviewer';

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      {canUpload && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upload Document</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Document Type</label>
              <Select value={selectedDocumentType} onValueChange={(value: any) => setSelectedDocumentType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resume">Resume</SelectItem>
                  <SelectItem value="cover_letter">Cover Letter</SelectItem>
                  <SelectItem value="portfolio">Portfolio</SelectItem>
                  <SelectItem value="assessment">Assessment</SelectItem>
                  <SelectItem value="feedback">Feedback/Notes</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                id="file-upload"
                multiple
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.zip"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">PDF, DOC, Images, ZIP files up to 10MB</p>
              </label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stage-Specific Documents */}
      {stageDocuments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stage Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stageDocuments.map((document) => (
                <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-600">
                      {getDocumentIcon(document.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">{document.name}</p>
                        <Badge className={getDocumentTypeColor(document.type)} variant="outline">
                          {document.type.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Uploaded by {document.uploadedBy}</span>
                        <span>{new Date(document.uploadedAt).toLocaleDateString()}</span>
                        <span>{formatFileSize(document.url)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    {canUpload && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteDocument(document.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* General Documents */}
      {generalDocuments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">General Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generalDocuments.map((document) => (
                <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-600">
                      {getDocumentIcon(document.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">{document.name}</p>
                        <Badge className={getDocumentTypeColor(document.type)} variant="outline">
                          {document.type.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Uploaded by {document.uploadedBy}</span>
                        <span>{new Date(document.uploadedAt).toLocaleDateString()}</span>
                        <span>{formatFileSize(document.url)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    {canUpload && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteDocument(document.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {stageDocuments.length === 0 && generalDocuments.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No documents uploaded yet</p>
            <p className="text-sm text-gray-400">Upload documents to keep track of candidate materials</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
