import PG from "pg";
const Pool = PG.Pool;

const pool = new Pool({

  user: "postgres", // Change this to the appropriate user if needed
  host: "localhost", // Use "localhost" because it's running locally
  database: "postgres", // Change this to the appropriate database name
  password: "", // You may need to specify a password if one is set
  port: 5433, // Use the correct port (5433 in your case)
});

export default pool;
