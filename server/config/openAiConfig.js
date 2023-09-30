import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openAi = async (userInfo, jobOffer) => {
  // Create an instance of OpenAI
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `User Information: ${userInfo}` },
        { role: "user", content: `Job Offer: ${jobOffer}` },
        { role: "assistant", content: "Dear Hiring Manager," },
      ],
    });

    if (response.choices && response.choices.length > 0) {
      console.log(
        "Message content from open ai",
        response.choices[0].message.content
      ); // Log the message content
      return response.choices[0].message.content; // Return the message content
    } else {
      throw new Error("No choices available in the response from OpenAI");
    }
  } catch (error) {
    console.error("Entire Error Object:", error);
    console.error("Error creating cover letter", error.message);
    throw error;
  }
};

export default openAi;
