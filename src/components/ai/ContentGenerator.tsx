
import React, { useState } from 'react';
import { FileText, Wand2, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useContentGenerator } from '@/hooks/useContentGenerator';
import { useToast } from '@/hooks/use-toast';

interface ContentGeneratorProps {
  type: 'job-description' | 'email-template' | 'candidate-outreach';
  context?: any;
  onGenerated?: (content: string) => void;
  className?: string;
}

export const ContentGenerator: React.FC<ContentGeneratorProps> = ({
  type,
  context,
  onGenerated,
  className
}) => {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [generatedContent, setGeneratedContent] = useState('');
  
  const { generateContent, isLoading } = useContentGenerator();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    try {
      const content = await generateContent({
        type,
        prompt,
        tone,
        length,
        context
      });
      
      setGeneratedContent(content);
      onGenerated?.(content);
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard."
    });
  };

  const getTitle = () => {
    switch (type) {
      case 'job-description':
        return 'AI Job Description Generator';
      case 'email-template':
        return 'AI Email Template Generator';
      case 'candidate-outreach':
        return 'AI Candidate Outreach Generator';
      default:
        return 'AI Content Generator';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          {getTitle()}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Describe what you want to generate:
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Describe the ${type.replace('-', ' ')} you want to create...`}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Tone</label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Length</label>
            <Select value={length} onValueChange={setLength}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="long">Long</SelectItem>
                <SelectItem value="detailed">Very Detailed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isLoading || !prompt.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Wand2 className="h-4 w-4 mr-2 animate-pulse" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              Generate Content
            </>
          )}
        </Button>

        {generatedContent && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">Generated Content</Badge>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded border">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-sm">
                  {generatedContent}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
