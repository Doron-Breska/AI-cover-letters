// openAiConfig.js
import dotenv from "dotenv";
import * as openai from "openai";
console.log(openai); // To check what is inside the openai object

dotenv.config();

const aiRole = `Your role is to create a cover letter for a user based on their information and a job offer. 

User Information: USER_INFO

Job Offer: JOB_OFFER

Please create a professional and personalized cover letter using the provided information. Start the response with "Dear Hiring Manager," and ensure it is in a formal, polite tone, highlighting the user's skills, experience, and suitability for the job offer provided.`;

const openAi = async (userInfo, jobOffer) => {
  console.log("OpenAI API Key at Server Start:", process.env.OPENAI_API_KEY);

  let OpenAIApi = openai.OpenAIApi;
  let Configuration = openai.Configuration;

  if (!OpenAIApi || !Configuration) {
    console.error("OpenAI module not loaded");
    throw new Error("OpenAI module not loaded");
  }

  let prompt = aiRole
    .replace("USER_INFO", userInfo)
    .replace("JOB_OFFER", jobOffer);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openaiApiInstance = new OpenAIApi(configuration);

  try {
    const response = await openaiApiInstance.createCompletion({
      model: "gpt-3.5-turbo", // Update the model here
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error creating cover letter", error.message);
    throw error;
  }
};

export default openAi;
