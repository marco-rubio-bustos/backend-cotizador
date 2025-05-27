import express from "express";
import { updateCustomerController } from "../controllers/updateCustomerController.js";

const router = express.Router();

router.put("/:id", updateCustomerController);

export default router;
