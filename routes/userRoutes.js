import express  from "express";
const router = express.Router();
import {
register,loginUser,
logoutUser,getLikedVideo,
addToLike,removeFromLike,
getAllHistory,addToHistory,
removeFromHistory,clearHistory,
getAllWatchLater,addToWatchLater,
removeFromWatchLater
} from "../controller/userController.js";
import { authenticateUser } from "../middleware/auth.js";

// auth routes
router.route("/register").post(register);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

// user liked videos
router.route("/user/liked").get(authenticateUser,getLikedVideo);
router.route("/user/liked").post(authenticateUser,addToLike);
router.route("/user/liked/:id").delete(authenticateUser,removeFromLike);

// user history 
router.route("/user/history").get(authenticateUser,getAllHistory);
router.route("/user/history").post(authenticateUser,addToHistory);
router.route("/user/clear/history").delete(authenticateUser,clearHistory);
router.route("/user/history/:id").delete(authenticateUser,removeFromHistory);


// watch later
router.route("/user/watchlater").get(authenticateUser,getAllWatchLater);
router.route("/user/watchlater").post(authenticateUser,addToWatchLater);
router.route("/user/watchlater/:id").delete(authenticateUser,removeFromWatchLater);


export default router

