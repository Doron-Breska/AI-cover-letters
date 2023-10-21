import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openAi = async (userInfo, questionnaire, jobOffer) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `The user has shared their professional and personal details as follows: ${userInfo}. The user also shared personality questionnaire results:"${questionnaire}". Use this information to tailor a cover letter for the user.Do NOT mention the ${questionnaire} results in the letter.`,
        },

        // { role: "user", content: `User Information: ${userInfo}` },
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
