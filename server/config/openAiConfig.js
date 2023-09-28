import { Configuration, OpenAIApi } from "openai";

const aiRole = `Your role is to create a cover letter for a user based on their information and a job offer. 

User Information: USER_INFO

Job Offer: JOB_OFFER

Please create a professional and personalized cover letter using the provided information. Start the response with "Dear Hiring Manager," and ensure it is in a formal, polite tone, highlighting the user's skills, experience, and suitability for the job offer provided.`;

const createCoverLetter = async (userInfo, jobOffer) => {
  let prompt = aiRole
    .replace("USER_INFO", userInfo)
    .replace("JOB_OFFER", jobOffer);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.data.choices[0].text.trim(); // Return the generated cover letter
  } catch (error) {
    console.error("Error creating cover letter", error);
    throw error;
  }
};

export default createCoverLetter;
