import pool from "../pgConfig.js";
import openAi from "../config/openAiConfig.js";

const getAllLetters = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM cover_letters");
    const letters = results.rows;
    res.status(200).json({ status: "Success", data: letters });
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ status: "Error", message: "Server error" });
  }
};

const getUsersAllLetter = async (req, res) => {
  const userId = req.user.user_id;
  try {
    const query = "SELECT * FROM cover_letters WHERE user_id = $1";
    const results = await pool.query(query, [userId]);
    const letters = results.rows;
    res.status(200).json({ status: "Success", data: letters });
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ status: "Error", message: "Server error" });
  }
};

const saveNewLetter = async (req, res) => {
  const userId = req.user.user_id;
  const { content, company_name, job_title } = req.body; // Extract data from the request body

  try {
    const query =
      "INSERT INTO cover_letters (user_id, content, company_name, job_title) VALUES ($1, $2, $3, $4) RETURNING *";
    const { rows } = await pool.query(query, [
      userId,
      content,
      company_name,
      job_title,
    ]);
    res.status(200).json({
      status: "Success",
      message: "Cover letter saved",
      data: rows[0],
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const deleteCoverLetter = async (req, res) => {
  try {
    const userId = req.user.user_id; // Get user_id from the token
    const letterId = req.params.id; // Get the cover letter ID from the URL parameter

    // Query the database to check if the cover letter exists and if its user_id matches the user's ID
    const query =
      "SELECT * FROM cover_letters WHERE c_v_id = $1 AND user_id = $2";
    const { rows } = await pool.query(query, [letterId, userId]);

    if (rows.length === 0) {
      return res
        .status(403)
        .json({ status: "Error", message: "Keep your fingers to yourself" });
    }

    // If the cover letter exists and user_id matches, proceed to delete it
    const deleteQuery = "DELETE FROM cover_letters WHERE c_v_id = $1";
    await pool.query(deleteQuery, [letterId]);

    res
      .status(200)
      .json({ status: "Success", message: "Cover letter deleted" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

const createNewLetter = async (req, res) => {
  const { company_name, job_title, description } = req.body;

  if (!company_name || !job_title || !description) {
    return res
      .status(400)
      .json({ status: "Error", message: "All fields are required!" });
  }

  const combinedJobInfo = `${company_name} + ${job_title} + ${description}`;

  try {
    const techInfo = req.user.tech_info;
    const personalInfo = JSON.stringify(req.user?.personal_info);
    const personalText = req.user?.personal_text || "";
    // const combinedUserInfo = `${techInfo} .the following characteristics are ranged from 0 to 5, 5 is the highest (the user ansered about himself): ${personalInfo}. ${personalText}`;
    const combinedUserInfo = `${techInfo}. ${personalText}`;

    const data = await openAi(combinedUserInfo, personalInfo, combinedJobInfo);

    // console.log("Data received in createNewLetter:", data);

    if (data) {
      return res.status(200).json({ status: "Success", message: data });
    } else {
      console.error("Unexpected response structure from OpenAI:", data);
      return res.status(500).json({
        status: "Error",
        message: "Unexpected response structure from OpenAI",
      });
    }
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({ status: "Error", message: "Server error" });
  }
};

export {
  getAllLetters,
  saveNewLetter,
  deleteCoverLetter,
  getUsersAllLetter,
  createNewLetter,
};
