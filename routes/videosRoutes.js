import express  from "express";
const router = express.Router();
import {newVideo,fetchAllVideo,videoDetail} from "../controller/videoControler.js"

router.route("/video/new").post(newVideo)
router.route("/video").get(fetchAllVideo)
router.route("/video/:id").get(videoDetail)

export default router