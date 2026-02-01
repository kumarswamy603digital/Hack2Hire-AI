import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompt = `You are an unbiased interview evaluation engine. You must evaluate candidate answers with strict objectivity.

SCORING DIMENSIONS (0-100 each):
1. Accuracy - Is the answer technically correct? Are facts and concepts accurate?
2. Clarity - Is the explanation clear, well-structured, and easy to understand?
3. Depth - Does the answer demonstrate deep understanding beyond surface level?
4. Relevance - Does the answer directly address the question asked?
5. Time Efficiency - Did they answer within expected time? (base 100, penalize overtime)

TIME PENALTY RULES:
- Within expected time: time_efficiency = 100
- 1-30 seconds over: time_efficiency = 85
- 31-60 seconds over: time_efficiency = 70
- 61-90 seconds over: time_efficiency = 50
- 90+ seconds over: time_efficiency = 30

OVERALL SCORE CALCULATION:
overall_score = (accuracy * 0.30) + (clarity * 0.20) + (depth * 0.25) + (relevance * 0.15) + (time_efficiency * 0.10)

VERDICT THRESHOLDS:
- overall_score >= 70: "strong"
- overall_score >= 50: "average"  
- overall_score < 50: "weak"

DIFFICULTY PROGRESSION RULES (STRICT):
- If overall_score >= 80: next_difficulty = current + 1 level (easy→medium, medium→hard, hard stays hard)
- If overall_score 50-79: next_difficulty = same as current
- If overall_score < 50: next_difficulty = current - 1 level (hard→medium, medium→easy, easy stays easy)

EARLY TERMINATION:
- Calculate average of last 3 scores (including current)
- If average_score_last_3 < 45: set should_continue = false and provide termination_reason
- Otherwise should_continue = true

PENALTY CONDITIONS:
- Vague answer (lacks specifics): Cap accuracy at 60, depth at 40
- Incomplete answer (missing key points): Cap depth at 50
- Off-topic answer: Cap relevance at 30
- Empty/refused answer: All dimensions 0

Be strict, objective, and decisive. No partial credit for wrong concepts.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { 
      question,
      answer,
      keyPoints,
      expectedSkills,
      expectedTimeSeconds,
      actualTimeSeconds,
      difficulty,
      lastScores = []
    } = await req.json();

    if (!question || answer === undefined) {
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

    // Calculate time penalty for context
    const overtimeSeconds = Math.max(0, actualTimeSeconds - expectedTimeSeconds);
    let timeEfficiencyHint = 100;
    if (overtimeSeconds > 90) timeEfficiencyHint = 30;
    else if (overtimeSeconds > 60) timeEfficiencyHint = 50;
    else if (overtimeSeconds > 30) timeEfficiencyHint = 70;
    else if (overtimeSeconds > 0) timeEfficiencyHint = 85;

    const context = `
QUESTION (${difficulty} difficulty): ${question}

EXPECTED KEY POINTS: ${keyPoints?.join(", ") || "Not specified"}
${expectedSkills ? `EXPECTED SKILLS TESTED: ${expectedSkills.join(", ")}` : ""}

CANDIDATE'S ANSWER: ${answer || "[No answer provided]"}

TIME ANALYSIS:
- Expected: ${expectedTimeSeconds} seconds
- Actual: ${actualTimeSeconds} seconds
- Overtime: ${overtimeSeconds} seconds
- Suggested time_efficiency score: ${timeEfficiencyHint}

LAST SCORES: ${lastScores.length > 0 ? lastScores.join(", ") : "None yet"}
- After evaluating this answer, calculate: average of (lastScores + this_overall_score), taking at most last 3
- If that average < 45, set should_continue = false and provide termination_reason explaining performance trend

DIFFICULTY ADJUSTMENT:
- Current difficulty: ${difficulty}
- Apply rules: >=80 increase, 50-79 same, <50 decrease

Evaluate this answer strictly across all dimensions. Apply penalties where appropriate. Output the exact JSON structure required.`;

    console.log("Evaluating answer with detailed dimensions, difficulty:", difficulty);

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
              description: "Evaluate the candidate's answer across all scoring dimensions",
              parameters: {
                type: "object",
                properties: {
                  accuracy: {
                    type: "number",
                    description: "Technical correctness score (0-100)"
                  },
                  clarity: {
                    type: "number",
                    description: "Explanation clarity score (0-100)"
                  },
                  depth: {
                    type: "number",
                    description: "Understanding depth score (0-100)"
                  },
                  relevance: {
                    type: "number",
                    description: "Answer relevance score (0-100)"
                  },
                  time_efficiency: {
                    type: "number",
                    description: "Time management score (0-100)"
                  },
                  overall_score: {
                    type: "number",
                    description: "Weighted overall score (0-100)"
                  },
                  verdict: {
                    type: "string",
                    enum: ["strong", "average", "weak"],
                    description: "Final verdict based on overall score"
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
                  penalties_applied: {
                    type: "array",
                    items: { type: "string" },
                    description: "List of penalties applied (if any)"
                  },
                  next_difficulty: {
                    type: "string",
                    enum: ["easy", "medium", "hard"],
                    description: "Recommended difficulty for next question"
                  },
                  should_continue: {
                    type: "boolean",
                    description: "Whether to continue the interview (false if avg last 3 scores < 45)"
                  },
                  termination_reason: {
                    type: "string",
                    description: "Explanation for early termination if should_continue is false"
                  }
                },
                required: ["accuracy", "clarity", "depth", "relevance", "time_efficiency", "overall_score", "verdict", "feedback", "strengths", "improvements", "penalties_applied", "next_difficulty", "should_continue"],
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
    console.log("Detailed evaluation complete:", {
      verdict: evaluation.verdict,
      overall: evaluation.overall_score,
      next_difficulty: evaluation.next_difficulty
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        ...evaluation,
        time_taken_seconds: actualTimeSeconds,
        expected_time_seconds: expectedTimeSeconds,
        overtime_seconds: overtimeSeconds
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
