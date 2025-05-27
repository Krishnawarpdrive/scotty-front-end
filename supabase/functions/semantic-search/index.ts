
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { query, tables, limit = 10, threshold = 0.5 } = await req.json();

    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    console.log(`Performing semantic search for: "${query}"`);
    const startTime = Date.now();

    // Generate embedding for the search query
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'models/embedding-001',
        content: {
          parts: [{ text: query }]
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const queryEmbedding = data.embedding?.values;

    if (!queryEmbedding) {
      throw new Error('No embedding received from Gemini API');
    }

    // Search across specified tables
    const searchResults = [];
    const tablesToSearch = tables || ['roles', 'requirements', 'clients', 'skills', 'global_roles'];

    for (const table of tablesToSearch) {
      try {
        // Use cosine distance for similarity search
        const { data: results, error } = await supabase.rpc('vector_similarity_search', {
          query_embedding: queryEmbedding,
          target_table: table,
          similarity_threshold: threshold,
          match_count: limit
        });

        if (error) {
          console.error(`Error searching ${table}:`, error);
          continue;
        }

        if (results && results.length > 0) {
          searchResults.push(...results.map((result: any) => ({
            ...result,
            table_name: table,
            similarity: result.similarity || 0
          })));
        }
      } catch (tableError) {
        console.error(`Error searching table ${table}:`, tableError);
        continue;
      }
    }

    // Sort by similarity score
    searchResults.sort((a, b) => b.similarity - a.similarity);

    const searchTime = Date.now() - startTime;

    // Log search analytics
    await supabase.from('search_analytics').insert({
      search_query: query,
      search_type: 'semantic',
      results_count: searchResults.length,
      search_time_ms: searchTime
    });

    console.log(`Semantic search completed in ${searchTime}ms, found ${searchResults.length} results`);

    return new Response(
      JSON.stringify({ 
        results: searchResults.slice(0, limit),
        total_results: searchResults.length,
        search_time_ms: searchTime
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in semantic search:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
