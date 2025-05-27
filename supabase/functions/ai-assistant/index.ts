
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface RequestBody {
  message: string;
  context?: string;
  contextData?: any;
  conversationHistory?: ChatMessage[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context, contextData, conversationHistory }: RequestBody = await req.json();
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    // Build context-aware prompt
    let systemPrompt = "You are an AI assistant for an ATS (Applicant Tracking System). ";
    
    switch (context) {
      case 'clients':
        systemPrompt += "You specialize in helping with client management, onboarding, and relationship optimization. ";
        break;
      case 'roles':
        systemPrompt += "You specialize in job role creation, skill matching, and requirements analysis. ";
        break;
      case 'requirements':
        systemPrompt += "You specialize in job requirement optimization and candidate matching. ";
        break;
      default:
        systemPrompt += "You help with general ATS operations and recruitment processes. ";
    }

    systemPrompt += "Provide helpful, accurate, and actionable advice. Keep responses concise but informative.";

    // Add context data if available
    if (contextData) {
      systemPrompt += `\n\nCurrent context data: ${JSON.stringify(contextData, null, 2)}`;
    }

    // Build conversation history
    const messages = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory || []),
      { role: 'user', content: message }
    ];

    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: messages.map(m => `${m.role}: ${m.content}`).join('\n\n')
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I was unable to generate a response.';

    // Generate suggestions based on context
    const suggestions = generateSuggestions(context, message);

    return new Response(JSON.stringify({
      content: aiResponse,
      suggestions
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('AI Assistant error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to process request',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateSuggestions(context?: string, message?: string): string[] {
  const suggestions: Record<string, string[]> = {
    clients: [
      "Show me client health scores",
      "What clients need attention?",
      "Generate client outreach email",
      "Analyze client requirements trends"
    ],
    roles: [
      "Create job description template",
      "Suggest skills for this role",
      "Find similar roles in database",
      "Optimize role requirements"
    ],
    requirements: [
      "Find matching candidates",
      "Analyze requirement urgency",
      "Suggest interview questions",
      "Compare with market standards"
    ]
  };

  return suggestions[context || 'general'] || [
    "Help me optimize workflows",
    "Show performance metrics",
    "Generate reports",
    "Suggest improvements"
  ];
}
