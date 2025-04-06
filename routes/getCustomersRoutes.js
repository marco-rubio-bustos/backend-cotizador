import express from "express";
import { getCustomers } from "../controllers/getCustomersController.js";

const router = express.Router();

router.get("/customers", getCustomers);

export default router;
