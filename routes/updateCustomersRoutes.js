import express from "express";
import { updateCustomerController } from "../controllers/updateCustomerController.js";

const router = express.Router();

// router.put("/:id", updateCustomerController);

router.put("/:id", (req, res) => {
  console.log("Solicitud recibida para actualizar cliente:", req.params.id);
  updateCustomerController(req, res);
});

export default router;
