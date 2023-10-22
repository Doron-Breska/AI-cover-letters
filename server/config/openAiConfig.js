import OpenAI from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const openAi = async (userInfo, jobOffer) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  console.log(
    "these are the variables from openAi function: ",
    userInfo,
    jobOffer
  );
  console.log("this is the key : ", process.env.OPENAI_API_KEY);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `The user has shared their professional and personal details: ${userInfo}. Use the information to create a cover letter.`,
        },
        { role: "user", content: `Job Offer: ${jobOffer}` },
        { role: "assistant", content: "Dear Hiring Manager," },
      ],
    });

    if (response.choices && response.choices.length > 0) {
      const content = response.choices[0].message.content;
      // console.log("Returning content from openAi:", content); to display in the terminal before returning
      return content;
    } else {
      throw new Error("No choices available in the response from OpenAI");
    }
  } catch (error) {
    console.error("Error creating cover letter", error.message);
    throw error;
  }
};

export default openAi;
