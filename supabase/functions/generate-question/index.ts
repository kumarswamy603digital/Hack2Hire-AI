import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompt = `You are an AI technical interviewer conducting a real interview. You must generate exactly ONE interview question based on the candidate's skills and job requirements.

RULES:
1. Ask ONE question at a time - never multiple questions
2. Match the specified difficulty level exactly
3. Questions must be practical and test real knowledge
4. Include expected time based on complexity
5. Be specific - avoid vague or overly broad questions
6. Categorize each question correctly

CATEGORIES:
- technical: Coding, algorithms, system design, debugging, tools, frameworks
- conceptual: Theory, principles, best practices, architecture patterns, trade-offs
- behavioral: Communication, teamwork, problem-solving approach, past experiences

DIFFICULTY GUIDELINES:
- easy: Basic concepts, definitions, simple syntax (60-90 seconds)
- medium: Applied knowledge, debugging, architecture decisions (90-150 seconds)
- hard: System design, complex algorithms, edge cases, optimization (150-300 seconds)

You MUST use the generate_question function to return your question in the exact JSON structure.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { 
      skills, 
      jobRequirements, 
      difficulty = "easy",
      previousQuestions = [],
      topic
    } = await req.json();

    if (!skills || skills.length === 0) {
      return new Response(
        JSON.stringify({ error: "Candidate skills are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const context = `
CANDIDATE SKILLS: ${skills.join(", ")}
${jobRequirements ? `JOB REQUIREMENTS: ${jobRequirements.join(", ")}` : ""}
${topic ? `FOCUS TOPIC: ${topic}` : ""}
REQUIRED DIFFICULTY: ${difficulty}
${previousQuestions.length > 0 ? `PREVIOUS QUESTIONS (do not repeat): ${previousQuestions.join("; ")}` : ""}

Generate a ${difficulty} level technical interview question that tests the candidate's knowledge. Make it specific and practical.`;

    console.log("Generating interview question at difficulty:", difficulty);

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
              name: "generate_question",
              description: "Generate a single interview question with metadata",
              parameters: {
                type: "object",
                properties: {
                  question: {
                    type: "string",
                    description: "The interview question text"
                  },
                  difficulty: {
                    type: "string",
                    enum: ["easy", "medium", "hard"],
                    description: "Question difficulty level"
                  },
                  expected_time_seconds: {
                    type: "number",
                    description: "Expected time to answer in seconds"
                  },
                  topic: {
                    type: "string",
                    description: "The skill/topic being tested"
                  },
                  category: {
                    type: "string",
                    enum: ["technical", "conceptual", "behavioral"],
                    description: "Question category: technical (coding/tools), conceptual (theory/patterns), behavioral (soft skills)"
                  },
                  key_points: {
                    type: "array",
                    items: { type: "string" },
                    description: "Key points expected in a good answer"
                  }
                },
                required: ["question", "difficulty", "expected_time_seconds", "topic", "category", "key_points"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_question" } },
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
        JSON.stringify({ error: "Failed to generate question" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall || toolCall.function.name !== "generate_question") {
      console.error("Unexpected response format:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Failed to parse AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const question = JSON.parse(toolCall.function.arguments);
    console.log("Question generated:", question.topic, "difficulty:", question.difficulty);

    return new Response(
      JSON.stringify({ success: true, ...question }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in generate-question function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
