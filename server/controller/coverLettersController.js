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

export { getAllLetters };
