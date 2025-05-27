
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  context: string;
  data: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { context, data }: RequestBody = await req.json();
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    let suggestions: any[] = [];

    switch (context) {
      case 'client-creation':
        suggestions = await generateClientSuggestions(data, geminiApiKey);
        break;
      case 'role-creation':
        suggestions = await generateRoleSuggestions(data, geminiApiKey);
        break;
      case 'requirement-creation':
        suggestions = await generateRequirementSuggestions(data, geminiApiKey);
        break;
      default:
        suggestions = [];
    }

    return new Response(JSON.stringify({ suggestions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Suggestion generation error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to generate suggestions',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function generateClientSuggestions(data: any, apiKey: string) {
  const suggestions = [];

  // Industry-based suggestions
  if (data.industry) {
    suggestions.push({
      title: `Optimize for ${data.industry} industry`,
      description: `Add industry-specific fields and requirements for ${data.industry} clients`,
      action: 'apply_industry_template',
      data: { industry_template: data.industry },
      confidence: 0.9
    });
  }

  // Company size suggestions
  if (data.employees) {
    const size = getCompanySize(data.employees);
    suggestions.push({
      title: `${size} company best practices`,
      description: `Apply best practices and communication strategies for ${size} companies`,
      action: 'apply_size_template',
      data: { size_template: size },
      confidence: 0.8
    });
  }

  // Geographic suggestions
  if (data.headquarters || data.billingCountry) {
    suggestions.push({
      title: 'Regional compliance check',
      description: 'Ensure compliance with local hiring regulations and practices',
      action: 'check_compliance',
      data: { region: data.headquarters || data.billingCountry },
      confidence: 0.7
    });
  }

  return suggestions;
}

async function generateRoleSuggestions(data: any, apiKey: string) {
  const suggestions = [];

  // Call Gemini for role-specific suggestions
  if (data.roleName && data.department) {
    const prompt = `Generate 3 suggestions for optimizing a ${data.roleName} role in ${data.department} department. Include skills, requirements, and best practices. Return as JSON array with title, description, action, and confidence fields.`;
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 512 }
        }),
      });

      if (response.ok) {
        const result = await response.json();
        const content = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (content) {
          // Parse AI response and format as suggestions
          const aiSuggestions = parseAISuggestions(content);
          suggestions.push(...aiSuggestions);
        }
      }
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
    }
  }

  return suggestions;
}

async function generateRequirementSuggestions(data: any, apiKey: string) {
  return [
    {
      title: 'Optimize job posting',
      description: 'Enhance visibility and attract quality candidates',
      action: 'optimize_posting',
      data: { optimization: 'seo_keywords' },
      confidence: 0.8
    },
    {
      title: 'Set realistic timeline',
      description: 'Based on role complexity and market conditions',
      action: 'suggest_timeline',
      data: { timeline: '30-45 days' },
      confidence: 0.7
    }
  ];
}

function getCompanySize(employees: string): string {
  const num = parseInt(employees);
  if (num < 10) return 'Startup';
  if (num < 50) return 'Small';
  if (num < 250) return 'Medium';
  if (num < 1000) return 'Large';
  return 'Enterprise';
}

function parseAISuggestions(content: string): any[] {
  try {
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error('Error parsing AI suggestions:', error);
  }
  
  // Fallback to parsing plain text
  return [{
    title: 'AI Optimization Suggestion',
    description: content.substring(0, 100) + '...',
    action: 'manual_review',
    data: { content },
    confidence: 0.6
  }];
}
