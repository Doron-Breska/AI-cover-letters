import OpenAI from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const composeOpenAiMessage = (userInfo, jobOffer) => {
  return [
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "user",
      content: `User Information: ${userInfo}. Use the information to create a tailored cover letter.`,
    },
    { role: "user", content: `Job Offer: ${jobOffer}` },
    { role: "assistant", content: "Dear Hiring Manager," },
  ];
};

const openAi = async (userInfo, jobOffer) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const messages = composeOpenAiMessage(userInfo, jobOffer);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    if (response.choices?.length) {
      return response.choices[0].message.content;
    } else {
      console.error("No choices available in the response from OpenAI");
      return null;
    }
  } catch (error) {
    console.error("Error creating cover letter:", error);
    throw error;
  }
};

export default openAi;
