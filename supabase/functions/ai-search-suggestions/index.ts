
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  query: string;
  tables: string[];
  limit?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, tables, limit = 5 }: RequestBody = await req.json();
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Log search query for analytics
    await supabase.from('search_analytics').insert({
      search_query: query,
      search_type: 'ai_suggestion_generation',
      results_count: 0
    });

    const suggestions = await generateSearchSuggestions(query, tables, geminiApiKey, limit);

    return new Response(JSON.stringify({ suggestions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('AI Search suggestions error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to generate search suggestions',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function generateSearchSuggestions(
  query: string, 
  tables: string[], 
  apiKey: string, 
  limit: number
) {
  const prompt = `Based on the search query "${query}" for an ATS system, generate ${limit} intelligent search suggestions that would help users find relevant information in these data sources: ${tables.join(', ')}.

Each suggestion should be a refined, more specific version of the original query that would yield better results. Consider:
- Different ways to phrase the query
- Related terms and synonyms
- More specific criteria
- Common search patterns in recruiting

Return the suggestions as a JSON array with this format:
[
  {
    "query": "suggested search query",
    "description": "why this suggestion would be helpful",
    "type": "search_type",
    "confidence": 0.8
  }
]`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
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
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (content) {
      try {
        // Extract JSON from the response
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.error('Error parsing AI suggestions:', parseError);
      }
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
  }

  // Fallback suggestions
  return [
    {
      query: `${query} active status`,
      description: "Filter for active records only",
      type: "filtered_search",
      confidence: 0.7
    },
    {
      query: `${query} recent`,
      description: "Show most recent results first",
      type: "temporal_search", 
      confidence: 0.6
    }
  ];
}
