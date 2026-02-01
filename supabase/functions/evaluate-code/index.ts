import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompt = `You are a code evaluation engine for a technical interview platform. Your job is to:

1. Analyze the submitted code for correctness
2. Simulate running the code against test cases (do NOT actually execute - just analyze)
3. Evaluate code quality (readability, efficiency, correctness)
4. Provide constructive feedback

For each test case, determine if the code would produce the expected output based on your analysis.
Be strict but fair - partial credit for partially correct solutions.

SCORING:
- Correctness (60%): Does the code solve the problem?
- Efficiency (25%): Is the solution optimized? (O(n) vs O(n²))
- Readability (15%): Is the code clean and well-structured?

Return structured evaluation with pass/fail for each test case.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { 
      code,
      language,
      challengeTitle,
      challengeDescription,
      testCases,
      timeSpentSeconds,
      expectedTimeMinutes
    } = await req.json();

    if (!code || !testCases) {
      return new Response(
        JSON.stringify({ error: "Code and test cases are required" }),
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

    const testCaseDescriptions = testCases.map((tc: any, i: number) => 
      `Test ${i + 1}: Input: ${tc.input}, Expected Output: ${tc.expectedOutput}`
    ).join("\n");

    const context = `
CHALLENGE: ${challengeTitle}
DESCRIPTION: ${challengeDescription}

SUBMITTED CODE (${language}):
\`\`\`${language}
${code}
\`\`\`

TEST CASES:
${testCaseDescriptions}

TIME ANALYSIS:
- Expected: ${expectedTimeMinutes} minutes
- Actual: ${Math.round(timeSpentSeconds / 60)} minutes

Analyze this code submission. For each test case, determine if the code would produce the correct output.
Evaluate code quality and provide detailed feedback.`;

    console.log("Evaluating code submission for:", challengeTitle);

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
              name: "evaluate_code",
              description: "Evaluate the code submission and test results",
              parameters: {
                type: "object",
                properties: {
                  testResults: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        testCaseId: { type: "string" },
                        passed: { type: "boolean" },
                        actualOutput: { type: "string" },
                        expectedOutput: { type: "string" },
                        executionTimeMs: { type: "number" },
                        error: { type: "string" }
                      },
                      required: ["testCaseId", "passed", "actualOutput", "expectedOutput", "executionTimeMs"]
                    },
                    description: "Results for each test case"
                  },
                  codeQuality: {
                    type: "object",
                    properties: {
                      readability: { type: "number", description: "0-100 score" },
                      efficiency: { type: "number", description: "0-100 score" },
                      correctness: { type: "number", description: "0-100 score" }
                    },
                    required: ["readability", "efficiency", "correctness"]
                  },
                  feedback: {
                    type: "string",
                    description: "Overall feedback on the submission"
                  },
                  suggestions: {
                    type: "array",
                    items: { type: "string" },
                    description: "Specific suggestions for improvement"
                  }
                },
                required: ["testResults", "codeQuality", "feedback", "suggestions"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "evaluate_code" } },
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
        JSON.stringify({ error: "Failed to evaluate code" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall || toolCall.function.name !== "evaluate_code") {
      console.error("Unexpected response format:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Failed to parse AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const evaluation = JSON.parse(toolCall.function.arguments);
    
    // Calculate overall score
    const passedCount = evaluation.testResults.filter((r: any) => r.passed).length;
    const totalCount = evaluation.testResults.length;
    const testScore = (passedCount / totalCount) * 60;
    const efficiencyScore = (evaluation.codeQuality.efficiency / 100) * 25;
    const readabilityScore = (evaluation.codeQuality.readability / 100) * 15;
    const overallScore = Math.round(testScore + efficiencyScore + readabilityScore);

    console.log("Code evaluation complete, score:", overallScore);

    return new Response(
      JSON.stringify({ 
        success: true, 
        score: overallScore,
        passedCount,
        totalCount,
        ...evaluation
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in evaluate-code function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
