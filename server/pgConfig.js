import PG from "pg";
const Pool = PG.Pool;

const pool = new Pool({
  user: "doron",
  host: "database-letters.cd3cu8asae7s.eu-central-1.rds.amazonaws.com",
  database: "letters_db",
  password: "Dbrd-11223344",
  port: 5455,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
