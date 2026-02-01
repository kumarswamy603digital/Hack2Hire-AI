import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompt = `You are a strict, objective AI interviewer evaluating candidate responses.

EVALUATION CRITERIA:
1. Technical accuracy (40%) - Is the answer correct?
2. Completeness (30%) - Did they cover all key points?
3. Clarity (20%) - Is the explanation clear and structured?
4. Time efficiency (10%) - Did they answer within expected time?

SCORING RULES:
- Base score on content quality (0-100)
- Deduct 5 points for every 30 seconds over expected time
- Incomplete answers cap at 70 max
- Wrong answers cap at 30 max
- Empty/refused answers get 0

DIFFICULTY ADJUSTMENT:
- Score >= 70: Recommend increasing difficulty
- Score 50-69: Maintain current difficulty
- Score < 50: Recommend decreasing or maintaining difficulty

Be strict but fair. Provide actionable feedback.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { 
      question,
      answer,
      keyPoints,
      expectedTimeSeconds,
      actualTimeSeconds,
      difficulty
    } = await req.json();

    if (!question || !answer) {
      return new Response(
        JSON.stringify({ error: "Question and answer are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const timePenalty = actualTimeSeconds > expectedTimeSeconds 
      ? Math.floor((actualTimeSeconds - expectedTimeSeconds) / 30) * 5
      : 0;

    const context = `
QUESTION (${difficulty} difficulty): ${question}

EXPECTED KEY POINTS: ${keyPoints?.join(", ") || "Not specified"}

CANDIDATE'S ANSWER: ${answer}

TIME ANALYSIS:
- Expected: ${expectedTimeSeconds} seconds
- Actual: ${actualTimeSeconds} seconds
- Time penalty: ${timePenalty} points

Evaluate this answer strictly and objectively. Apply the time penalty to your final score.`;

    console.log("Evaluating answer for question at difficulty:", difficulty);

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
              name: "evaluate_answer",
              description: "Evaluate the candidate's answer and provide scoring",
              parameters: {
                type: "object",
                properties: {
                  score: {
                    type: "number",
                    description: "Final score from 0-100 after all penalties"
                  },
                  technical_accuracy: {
                    type: "number",
                    description: "Score for technical accuracy (0-100)"
                  },
                  completeness: {
                    type: "number",
                    description: "Score for answer completeness (0-100)"
                  },
                  clarity: {
                    type: "number",
                    description: "Score for explanation clarity (0-100)"
                  },
                  feedback: {
                    type: "string",
                    description: "Constructive feedback for the candidate"
                  },
                  strengths: {
                    type: "array",
                    items: { type: "string" },
                    description: "What the candidate did well"
                  },
                  improvements: {
                    type: "array",
                    items: { type: "string" },
                    description: "Areas for improvement"
                  },
                  next_difficulty: {
                    type: "string",
                    enum: ["easy", "medium", "hard"],
                    description: "Recommended difficulty for next question"
                  },
                  should_continue: {
                    type: "boolean",
                    description: "Whether to continue the interview or terminate early"
                  }
                },
                required: ["score", "technical_accuracy", "completeness", "clarity", "feedback", "strengths", "improvements", "next_difficulty", "should_continue"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "evaluate_answer" } },
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
        JSON.stringify({ error: "Failed to evaluate answer" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall || toolCall.function.name !== "evaluate_answer") {
      console.error("Unexpected response format:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Failed to parse AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const evaluation = JSON.parse(toolCall.function.arguments);
    console.log("Answer evaluated, score:", evaluation.score, "next difficulty:", evaluation.next_difficulty);

    return new Response(
      JSON.stringify({ 
        success: true, 
        ...evaluation,
        time_penalty: timePenalty,
        actual_time_seconds: actualTimeSeconds,
        expected_time_seconds: expectedTimeSeconds
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in evaluate-answer function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
