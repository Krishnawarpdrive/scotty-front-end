
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create the vector similarity search function
    const createFunctionSQL = `
      CREATE OR REPLACE FUNCTION vector_similarity_search(
        query_embedding vector(768),
        target_table text,
        similarity_threshold float DEFAULT 0.5,
        match_count int DEFAULT 10
      )
      RETURNS TABLE (
        id uuid,
        name text,
        description text,
        similarity float
      )
      LANGUAGE plpgsql
      AS $$
      DECLARE
        sql_query text;
      BEGIN
        sql_query := format('
          SELECT 
            id,
            COALESCE(name, title) as name,
            COALESCE(description, job_description, content) as description,
            1 - (embedding <=> %L) as similarity
          FROM %I
          WHERE embedding IS NOT NULL
            AND 1 - (embedding <=> %L) > %L
          ORDER BY embedding <=> %L
          LIMIT %L
        ', query_embedding, target_table, query_embedding, similarity_threshold, query_embedding, match_count);
        
        RETURN QUERY EXECUTE sql_query;
      END;
      $$;
    `;

    const { error } = await supabase.rpc('exec_sql', { sql: createFunctionSQL });

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Search function created successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error creating search function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
