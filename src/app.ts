import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { UserService } from "./user_service";
import { MockUserRepository } from "./repository/mock_user";
import { MySQLUserRepository } from "./repository/user_mysql";
import { createUserRouter } from "./http/user";
import mysql from "mysql";
import { UserRepository } from "./user_repository";

async function main() {
  dotenv.config();

  const app = express();
  app.use(bodyParser.json());

  const host = process.env.HOST || "127.0.0.1";
  const port = process.env.PORT || 3000;

  var connection = mysql.createConnection({
    host: process.env.DATABASE_HOST || "localhost",
    user: process.env.DATABASE_USER || "mysql_admin",
    password: process.env.DATABASE_PASSWORD || "mysql_secret",
    database: process.env.DATABASE_NAME || "mysql_database",
  });

  connection.connect((err) => {
    let userRepository: UserRepository = new MockUserRepository();

    if (err) {
      console.error("Error connecting to the database:", err.message);
      console.log("Service will be using mock repository instead.");
    } else {
      console.log("Connected to the MySQL server.");

      userRepository = new MySQLUserRepository(connection);
    }
    const userService = new UserService(userRepository);

    app.use("/users", createUserRouter(userService));
  });

  app.listen(port, () => {
    console.log(`Server running on http://${host}:${port}`);
  });
}

main();
