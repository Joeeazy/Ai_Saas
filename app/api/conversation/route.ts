import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@clerk/nextjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//const openai = new OpenAI(configuration);

export async function POST(req: Request) {
  try {
    console.log("Processing request...");

    const { userId } = await auth(); // Ensure you are using the correct auth function from Clerk

    const body = await req.json();
    const { messages } = body;

    console.log("Auth Data: ", userId);
    console.log("Messages: ", messages);

    // Check for authentication
    if (!userId) {
      console.error("Unauthorized access");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if OpenAI API key is properly configured
    if (!openai.apiKey) {
      console.error("OpenAI API Key Not configured");
      return new NextResponse("OpenAI API Key Not configured", { status: 500 });
    }

    // Check for messages
    if (!messages) {
      console.error("Messages are required");
      return new NextResponse("Messages are required", { status: 400 });
    }

    // Get response
    console.log("Sending request to OpenAI");
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });
    console.log("OpenAI response received: ", response.choices[0].message);

    return NextResponse.json(response.choices[0].message);
    // const response = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages,
    // });

    // return new NextResponse(JSON.stringify(response.choices[0].message));
  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
