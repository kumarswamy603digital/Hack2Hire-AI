import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompt = `You are a personalized learning coach for technical professionals. Based on assessment data, create a customized skill improvement plan.

Your plan should:
1. Identify skill gaps from the assessment scores
2. Prioritize areas that need the most improvement
3. Provide specific, actionable learning recommendations
4. Include resources (courses, books, practice platforms)
5. Create a realistic timeline
6. Set measurable milestones

Be encouraging but realistic. Focus on practical skills that will help in technical interviews and real-world work.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { 
      assessmentScores,
      skillCategories,
      currentRole,
      targetRole,
      availableHoursPerWeek
    } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const context = `
CANDIDATE ASSESSMENT DATA:
${JSON.stringify(assessmentScores, null, 2)}

SKILL CATEGORIES TESTED:
${skillCategories?.join(", ") || "General technical skills"}

CURRENT ROLE: ${currentRole || "Not specified"}
TARGET ROLE: ${targetRole || "Not specified"}
AVAILABLE STUDY TIME: ${availableHoursPerWeek || 5} hours per week

Create a personalized skill improvement plan based on this assessment data.`;

    console.log("Generating skill improvement plan");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: context },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_improvement_plan",
              description: "Create a personalized skill improvement plan",
              parameters: {
                type: "object",
                properties: {
                  summary: {
                    type: "string",
                    description: "Brief overview of the plan (2-3 sentences)"
                  },
                  strengths: {
                    type: "array",
                    items: { type: "string" },
                    description: "Skills where the candidate performed well"
                  },
                  weaknesses: {
                    type: "array",
                    items: { type: "string" },
                    description: "Skills that need improvement"
                  },
                  prioritizedSkills: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        skill: { type: "string" },
                        currentLevel: { type: "string", enum: ["beginner", "intermediate", "advanced"] },
                        targetLevel: { type: "string", enum: ["beginner", "intermediate", "advanced", "expert"] },
                        priority: { type: "string", enum: ["high", "medium", "low"] },
                        estimatedWeeks: { type: "number" }
                      }
                    },
                    description: "Skills to focus on, ordered by priority"
                  },
                  learningPath: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        week: { type: "number" },
                        focus: { type: "string" },
                        activities: { type: "array", items: { type: "string" } },
                        milestone: { type: "string" }
                      }
                    },
                    description: "Week-by-week learning plan (4-8 weeks)"
                  },
                  resources: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        type: { type: "string", enum: ["course", "book", "practice", "video", "documentation"] },
                        name: { type: "string" },
                        description: { type: "string" },
                        skill: { type: "string" },
                        isFree: { type: "boolean" }
                      }
                    },
                    description: "Recommended learning resources"
                  },
                  dailyPractice: {
                    type: "array",
                    items: { type: "string" },
                    description: "Daily habits to build (3-5 items)"
                  },
                  successMetrics: {
                    type: "array",
                    items: { type: "string" },
                    description: "How to measure progress"
                  }
                },
                required: ["summary", "strengths", "weaknesses", "prioritizedSkills", "learningPath", "resources", "dailyPractice", "successMetrics"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "create_improvement_plan" } },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to generate improvement plan" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall || toolCall.function.name !== "create_improvement_plan") {
      console.error("Unexpected response format:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Failed to parse AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const plan = JSON.parse(toolCall.function.arguments);
    console.log("Skill improvement plan generated successfully");

    return new Response(
      JSON.stringify({ success: true, ...plan }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in skill-plan function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
