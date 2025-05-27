
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  type: string;
  prompt: string;
  tone: string;
  length: string;
  context?: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, prompt, tone, length, context }: RequestBody = await req.json();
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    const content = await generateContent(type, prompt, tone, length, context, geminiApiKey);

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Content generation error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to generate content',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function generateContent(
  type: string, 
  prompt: string, 
  tone: string, 
  length: string, 
  context: any,
  apiKey: string
): Promise<string> {
  
  let systemPrompt = '';
  
  switch (type) {
    case 'job-description':
      systemPrompt = `Generate a comprehensive job description with the following characteristics:
      - Tone: ${tone}
      - Length: ${length}
      - Include: role overview, key responsibilities, requirements, qualifications
      - Format: Professional and ATS-friendly
      - Context: ${context ? JSON.stringify(context) : 'General role'}`;
      break;
      
    case 'email-template':
      systemPrompt = `Generate a professional email template with:
      - Tone: ${tone}
      - Length: ${length}
      - Include: proper greeting, clear purpose, call-to-action, professional closing
      - Format: Email-ready with subject line`;
      break;
      
    case 'candidate-outreach':
      systemPrompt = `Generate candidate outreach content with:
      - Tone: ${tone} and engaging
      - Length: ${length}
      - Include: personalized greeting, role highlights, company benefits, clear next steps
      - Format: Recruiting message`;
      break;
      
    default:
      systemPrompt = `Generate ${type} content with ${tone} tone and ${length} length.`;
  }

  const fullPrompt = `${systemPrompt}\n\nUser request: ${prompt}`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: fullPrompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: getLengthTokens(length),
      }
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate content.';
}

function getLengthTokens(length: string): number {
  switch (length) {
    case 'short': return 256;
    case 'medium': return 512;
    case 'long': return 1024;
    case 'detailed': return 2048;
    default: return 512;
  }
}
