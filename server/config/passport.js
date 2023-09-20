import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import * as dotenv from "dotenv";
import pool from "../pgConfig.js";
dotenv.config();

const passportConfig = () => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  const myStrategy = new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      // Query your database to find the user based on jwtPayload.sub
      const query = "SELECT * FROM users WHERE user_id = $1";
      const { rows } = await pool.query(query, [jwtPayload.sub]);

      if (rows.length === 0) {
        return done(null, false); // User not found
      }

      const user = rows[0];
      return done(null, user); // Found user
    } catch (error) {
      return done(error, false); // Error occurred
    }
  });

  passport.use(myStrategy);
};

export { passportConfig };
