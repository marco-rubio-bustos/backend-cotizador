import express from "express";
import { getQuotationItems } from "../controllers/getQuotationItemsController.js";

const router = express.Router();

router.get("/", getQuotationItems);

export default router;
