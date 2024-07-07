import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { auth } from "@clerk/nextjs";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { messages } = body;

    // Check for authentication
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if OpenAI API key is properly configured
    if (!configuration.apiKey) {
      return new NextResponse("OpenAi Api Key Not configured", { status: 500 });
    }

    // Check for messages
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    // Get response
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// import { NextResponse } from "@/node_modules/next/server";
// import { Configuration, OpenAIApi } from "openai";
// import { auth } from "@clerk/nextjs";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// export async function post(req: Request) {
//   try {
//     const { userId } = auth();
//     const body = await req.json();

//     const { messages } = body;

//     //check for authentication
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     //check if openai api_key is properly configured
//     if (!configuration) {
//       return new NextResponse("OpenAi Api Key Not configured", { status: 500 });
//     }

//     //check for messages

//     if (!messages) {
//       return new NextResponse("Messages are required", { status: 400 });
//     }

//     //get response
//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages,
//     });

//     return NextResponse.json(response.data.choices[0].message);
//   } catch (error) {
//     console.log("[CONVERSATION_ERROR]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }
