import express from "express";
const router = express.Router();
import { getContact } from "../controllers/contactController.js";

//CLEANER WAY IS WE IMPORT ALL THE ROUTES FROM A CONTROLLER FILE WHERE ALL THE ROUTES ARE DEFINED

router.route("/").get(getContact);

export default router;
