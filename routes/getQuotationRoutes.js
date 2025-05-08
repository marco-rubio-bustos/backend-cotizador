import express from "express";
import { getQuotation } from "../controllers/getQuotationController.js";

const router = express.Router();

router.get("/", getQuotation);

export default router;
