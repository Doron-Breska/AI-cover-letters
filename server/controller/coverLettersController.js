import pool from "../pgConfig.js";
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

export { getAllLetters, saveNewLetter, deleteCoverLetter };
