import pool from "../pgConfig.js";

// const testRoute = async (req, res) => {
//   // console.log("pool>>>", pool);
//   try {
//     const results = pool.query("SELECT * FROM users", (error, results) => {
//       console.log("results----", results);
//       error && console.log("error1", error);
//     });
//   } catch (error) {
//     console.log("error2", error);
//   }
// };

const getAllUsers = async (req, res) => {
  try {
    const results = pool.query("SELECT * FROM users", (error, results) => {
      console.log("results----", results);
      error && console.log("error1", error);
    });
  } catch (error) {
    console.log("error2", error);
  }
};

export { getAllUsers };
