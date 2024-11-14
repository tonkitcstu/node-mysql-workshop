import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { UserService } from "./user_service";
import { MockUserRepository } from "./repository/mock_user";
import { createUserRouter } from "./http/user";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

// Replace mockRepository below with your new MySQL Repository
const mockRepo = new MockUserRepository();
const userService = new UserService(mockRepo);

app.use("/users", createUserRouter(userService));
app.listen(port, () => {
  console.log(`Server running on http://${host}:${port}`);
});
