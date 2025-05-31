
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { action, data } = await req.json()

    switch (action) {
      case 'get_ta_workloads':
        return await getTAWorkloads(supabaseClient)
      case 'get_ta_workload':
        return await getTAWorkload(supabaseClient, data.ta_id)
      case 'get_ta_performance_metrics':
        return await getTAPerformanceMetrics(supabaseClient, data.ta_id, data.period)
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

async function getTAWorkloads(supabase: any) {
  // This would calculate workloads for all TAs
  // For now, return mock data
  const mockWorkloads = [
    {
      ta_id: '1',
      ta_name: 'John Doe',
      active_assignments: 5,
      total_capacity: 8,
      utilization_percentage: 62.5,
      upcoming_deadlines: 2,
      overdue_tasks: 0
    },
    {
      ta_id: '2',
      ta_name: 'Jane Smith',
      active_assignments: 7,
      total_capacity: 8,
      utilization_percentage: 87.5,
      upcoming_deadlines: 3,
      overdue_tasks: 1
    }
  ]

  return new Response(
    JSON.stringify(mockWorkloads),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function getTAWorkload(supabase: any, taId: string) {
  // Calculate workload for specific TA
  const mockWorkload = {
    ta_id: taId,
    ta_name: 'John Doe',
    active_assignments: 5,
    total_capacity: 8,
    utilization_percentage: 62.5,
    upcoming_deadlines: 2,
    overdue_tasks: 0
  }

  return new Response(
    JSON.stringify(mockWorkload),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function getTAPerformanceMetrics(supabase: any, taId: string, period: string) {
  // Calculate performance metrics for specific TA
  const mockMetrics = {
    ta_id: taId,
    period: period,
    assignments_completed: 12,
    success_rate: 85.5,
    average_time_to_fill: 14.2,
    client_satisfaction_score: 4.2,
    quality_score: 88.0,
    efficiency_rating: 92.5
  }

  return new Response(
    JSON.stringify(mockMetrics),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}
