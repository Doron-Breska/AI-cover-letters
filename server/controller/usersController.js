import pool from "../pgConfig.js";
import { verifyPassword, encryptPassword } from "../utils/bcrypt.js";

const getAllUsers = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM users");
    const users = results.rows;
    res.status(200).json({ status: "Success", data: users });
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ status: "Error", message: "Server error" });
  }
};

const createUser = async (req, res) => {
  const {
    username,
    email,
    first_name,
    last_name,
    password,
    tech_info,
    personal_info,
    personal_text,
  } = req.body;

  try {
    const hashedPassword = await encryptPassword(password);
    const query = `
      INSERT INTO users (username, email, first_name, last_name, password, tech_info, personal_info, personal_text)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`;

    const values = [
      username,
      email,
      first_name,
      last_name,
      hashedPassword,
      tech_info,
      personal_info,
      personal_text,
    ];
    const { rows } = await pool.query(query, values);

    res
      .status(200)
      .json({ status: "success", message: "User created", user: rows[0] });
  } catch (error) {
    if (error.code === "23505") {
      if (error.constraint === "users_username_key") {
        return res
          .status(400)
          .json({ status: "error", message: "Username is already taken." });
      } else if (error.constraint === "users_email_key") {
        return res
          .status(400)
          .json({ status: "error", message: "Email is already registered." });
      }
    }
    console.error("Error:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export { getAllUsers, createUser };
