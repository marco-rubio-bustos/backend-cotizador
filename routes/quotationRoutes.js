import express from "express";
import { quotationController } from "../controllers/quotationController.js";

const router = express.Router();

router.post("/", quotationController);

export default router;
