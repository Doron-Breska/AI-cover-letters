import pool from "../pgConfig.js";
import { verifyPassword, encryptPassword } from "../utils/bcrypt.js";
import { imageUpload } from "../utils/imageManagement.js";
import { generateToken } from "../utils/jwt.js";

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

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const query = "SELECT * FROM users WHERE user_id = $1";
    const { rows } = await pool.query(query, [userId]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ status: "Error", message: "User not found" });
    }

    const user = rows[0];
    res.status(200).json({ status: "Success", data: user });
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

  const pfofilePic = await imageUpload(req.file, "imgs");

  try {
    const hashedPassword = await encryptPassword(password);
    const query = `
      INSERT INTO users (username, email, first_name, last_name, password, tech_info, personal_info, personal_text,img)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
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
      pfofilePic,
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

const logIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = "SELECT * FROM users WHERE username = $1";
    const { rows } = await pool.query(query, [username]);

    if (rows.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const user = rows[0];
    const verified = await verifyPassword(password, user.password);

    if (verified) {
      const token = generateToken(user);
      console.log("this is the token", token);
      return res.status(200).json({
        msg: "Login successful",
        token: token,
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          tech_info: user.tech_info,
          personal_info: user.personal_info,
          personal_text: user.personal_text,
          img: user.img,
        },
      });
    } else {
      return res.status(401).json({ msg: "Invalid password" });
    }
  } catch (error) {
    console.error("Error details:", error);

    return res
      .status(500)
      .json({ msg: "Something went wrong with the login process", error });
  }
};

const getActiveUser = async (req, res) => {
  try {
    const user = req.user; // Access the user object from req.user

    res.status(200).json({ status: "Success", activeUser: user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};
const updateUser = async (req, res) => {
  const userIdUpdate = req.params.id;
  const { username, email, password } = req.body;

  try {
    // Check if the requesting user is authorized to update the user
    const queryCheck = "SELECT * FROM users WHERE user_id = $1";
    const { rows } = await pool.query(queryCheck, [userIdUpdate]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ status: "Error", message: "User not found" });
    }

    const currentUser = rows[0];

    if (currentUser.username !== req.user.username) {
      return res.status(403).json({
        error: "You are not authorized to update this user",
      });
    }

    // Build the UPDATE query to update only the specified fields
    const queryUpdate = `
      UPDATE users
      SET
        username = $1,
        email = $2,
        password = $3
      WHERE user_id = $4
      RETURNING *`;

    const hashedPassword = await encryptPassword(password);

    const values = [username, email, hashedPassword, userIdUpdate];

    // Execute the UPDATE query
    const { rows: updatedUser } = await pool.query(queryUpdate, values);

    if (updatedUser.length === 0) {
      return res.status(500).json({
        status: "Error",
        message: "User update failed",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "User has been updated",
      updateUser: updatedUser[0],
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "Error",
      message: "Something went wrong with updating the user",
    });
  }
};

export {
  getAllUsers,
  createUser,
  getUserById,
  logIn,
  updateUser,
  getActiveUser,
};
