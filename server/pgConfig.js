import PG from "pg";
const Pool = PG.Pool;

import * as dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: "postgres",
  host: "ai-job-boards.c85edmmwq2e9.eu-north-1.rds.amazonaws.com",
  database: "ai_jobs",
  password: "Dbrd-11223344",
  port: 5432,
});

export default pool;
