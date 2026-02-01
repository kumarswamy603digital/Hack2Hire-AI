import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompt = `You are a supportive AI interview coach helping candidates practice and improve. Your role is to:

1. Evaluate their answer fairly (score 0-100)
2. Identify what they did well (strengths)
3. Provide actionable improvements
4. Give a MODEL ANSWER showing the ideal response
5. Offer specific coaching tips to help them grow
6. Suggest what topic to practice next

Be encouraging but honest. Focus on helping them learn and improve.

SCORING GUIDELINES:
- 90-100: Exceptional answer, covers all key points with depth
- 70-89: Good answer, covers most key points
- 50-69: Adequate answer, missing some important aspects
- 30-49: Weak answer, fundamental gaps
- 0-29: Very weak, major misunderstandings

Always provide a complete model answer that demonstrates the ideal response.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { 
      question,
      answer,
      keyPoints,
      topic,
      difficulty,
      timeSpent,
      expectedTime
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

    const context = `
PRACTICE QUESTION (${difficulty} difficulty): ${question}
TOPIC: ${topic}
EXPECTED KEY POINTS: ${keyPoints?.join(", ") || "Not specified"}

CANDIDATE'S ANSWER: ${answer || "[No answer provided]"}

TIME ANALYSIS:
- Expected: ${expectedTime} seconds
- Actual: ${timeSpent} seconds

Please evaluate this practice answer and provide coaching feedback. Be supportive and constructive. Include a full model answer.`;

    console.log("Evaluating practice answer for topic:", topic);

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
              name: "provide_coaching",
              description: "Provide coaching feedback for the practice answer",
              parameters: {
                type: "object",
                properties: {
                  score: {
                    type: "number",
                    description: "Score from 0-100"
                  },
                  strengths: {
                    type: "array",
                    items: { type: "string" },
                    description: "What the candidate did well (2-4 points)"
                  },
                  improvements: {
                    type: "array",
                    items: { type: "string" },
                    description: "Specific areas to improve (2-4 points)"
                  },
                  model_answer: {
                    type: "string",
                    description: "A complete, ideal answer to the question (detailed, 100-200 words)"
                  },
                  coaching_tips: {
                    type: "array",
                    items: { type: "string" },
                    description: "Actionable tips to improve interview performance (2-3 tips)"
                  },
                  next_topic_suggestion: {
                    type: "string",
                    description: "Suggested topic to practice next based on their performance"
                  }
                },
                required: ["score", "strengths", "improvements", "model_answer", "coaching_tips", "next_topic_suggestion"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "provide_coaching" } },
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
        JSON.stringify({ error: "Failed to evaluate practice answer" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall || toolCall.function.name !== "provide_coaching") {
      console.error("Unexpected response format:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Failed to parse AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const evaluation = JSON.parse(toolCall.function.arguments);
    console.log("Practice evaluation complete, score:", evaluation.score);

    return new Response(
      JSON.stringify({ success: true, ...evaluation }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in practice-evaluate function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
