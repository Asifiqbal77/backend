//original code beloq
import express from "express";
import { register, login, getUsers, getUser, updateUser, deleteUser } from "../controllers/loginregcontroller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getUsers);               // GET all users
router.get("/users/:id", getUser);            // GET a single user by ID
router.put("/users/:id", updateUser);         // UPDATE a user by ID
router.delete("/users/:id", deleteUser);      // DELETE a user by ID

export default router;