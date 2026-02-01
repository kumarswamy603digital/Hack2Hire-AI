/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { base64Content, fileName } = await req.json();

    if (!base64Content) {
      return new Response(
        JSON.stringify({ success: false, error: "No PDF content provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing JD PDF: ${fileName}`);

    // Use Gemini to extract text from PDF
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": Deno.env.get("GEMINI_API_KEY")!,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inline_data: {
                    mime_type: "application/pdf",
                    data: base64Content,
                  },
                },
                {
                  text: `Extract ALL the text content from this job description PDF document. 
                  
Return the complete text exactly as it appears, preserving:
- Job title and company name
- About the role/company sections
- All requirements (required and nice-to-have)
- Responsibilities
- Benefits and perks
- Any other relevant information

Return ONLY the extracted text content, no commentary or formatting changes.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 8192,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const result = await response.json();
    const extractedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!extractedText) {
      throw new Error("Failed to extract text from PDF");
    }

    console.log(`Successfully extracted ${extractedText.length} characters from JD`);

    return new Response(
      JSON.stringify({
        success: true,
        text: extractedText.trim(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing JD PDF:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Failed to process PDF",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
