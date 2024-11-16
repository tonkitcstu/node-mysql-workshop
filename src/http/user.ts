import express, { Request, Response } from "express";
import { UserService } from "../user_service";

export const createUserRouter = (service: UserService) => {
  const router = express.Router();

  router.get("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = await service.findUserByID(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });

  router.get("/", async (req: Request, res: Response) => {
    const user = await service.findAllUser();
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Users not found" });
    }
  });

  return router;
};
