import pool from "../pgConfig.js";

const testRoute = async (req, res) => {
  console.log("pool>>>", pool);
  try {
    const results = pool.query("SELECT * FROM users", (error, results) => {
      console.log("results", results);
      console.log("errorrrrr", error);
    });
    console.log("resal results ", results);
  } catch (error) {
    console.log("error2", error);
  }
};

export { testRoute };
