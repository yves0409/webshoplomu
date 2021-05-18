import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  googleLogin,
  facebookLogin,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

//CLEANER WAY IS WE IMPORT ALL THE ROUTES FROM A CONTROLLER FILE WHERE ALL THE ROUTES ARE DEFINED
router.route("/").post(registerUser).get(protect, admin, getUsers); //removed admin from getusers!!!
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
//NOTICE HOW THE GET AND THE PUT METHOD ARE CHAINED
//ALSO THE PROTECT MIDDLEWARE THAT WE CAN JUST ADD WHEN WE HAVE A PROTECTED ROUTE
router
  .route("/:id")
  .delete(protect, admin, deleteUser) //removed admin from deleteUser!!!
  .get(protect, admin, getUserById) //removed admin from getUserById!!!
  .put(protect, admin, updateUser); //removed admin from updateUser!!!

//GOOGLE LOGIN
router.post("/google-login", googleLogin, protect, admin);
router.post("/facebook-login", facebookLogin, protect, admin);

export default router;
