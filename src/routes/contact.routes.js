import express from "express"
import { sendContact } from "../controllers/contact.controller.js"
import { contactLimiter } from "../middlewares/rateLimiter.js"
import { contactValidation } from "../middlewares/validate.js"

const router = express.Router()

router.post("/", contactLimiter, contactValidation, sendContact)

export default router
