import express from "express";
import { customerController } from "../controllers/customersController.js";

const router = express.Router();

router.post("/", customerController);

export default router;
