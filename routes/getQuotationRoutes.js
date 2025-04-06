import express from "express";
import { getQuotation } from "../controllers/getQuotationController.js";

const router = express.Router();

router.get("/quotation", getQuotation);

export default router;
