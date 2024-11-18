import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { UserService } from "./user_service";
import { MockUserRepository } from "./repository/mock_user";
import { MySQLUserRepository } from "./repository/user_mysql";
import { createUserRouter } from "./http/user";
import mysql, { Connection } from "mysql";
import { UserRepository } from "./user_repository";

async function main() {
  dotenv.config();

  const app = express();
  app.use(bodyParser.json());

  const host = process.env.HOST || "127.0.0.1";
  const port = process.env.PORT || 3000;

  const createConnection = () => {
    return mysql.createConnection({
      host: process.env.DATABASE_HOST || "localhost",
      port: Number(process.env.DATABASE_PORT) || 3306,
      user: process.env.DATABASE_USER || "mysql_admin",
      password: process.env.DATABASE_PASSWORD || "mysql_secret",
      database: process.env.DATABASE_NAME || "mysql_database",
    });
  };

  const maxRetry = 5;
  const waitForMySQL = (
    retries = maxRetry,
    delay = 2000,
  ): Promise<Connection> => {
    return new Promise((resolve, reject) => {
      console.log("Connecting database...");
      const attemptConnection = () => {
        const connection = createConnection();
        connection.connect((err) => {
          if (!err) {
            resolve(connection);
          } else if (retries === 0) {
            reject(new Error("Unable to connect to MySQL"));
          } else {
            console.log(err.message);
            const retryTime = maxRetry - retries + 1;
            console.log(`Retry: ${retryTime}, Max retry: ${maxRetry}`);
            retries--;
            setTimeout(attemptConnection, delay);
          }
        });
      };
      attemptConnection();
    });
  };

  const createUserHandler = (userRepository: UserRepository) => {
    const userService = new UserService(userRepository);
    app.use("/users", createUserRouter(userService));
  };

  waitForMySQL()
    .then((connection: Connection) => {
      console.log("Connected to the MySQL server.");
      createUserHandler(new MySQLUserRepository(connection));
    })
    .catch((err) => {
      console.error("Error connecting to the database:", err.message);
      console.log("Service will be using mock repository instead.");
      createUserHandler(new MockUserRepository());
    });

  app.listen(port, () => {
    console.log(`Server running on http://${host}:${port}`);
  });
}

main();
