import { body } from "express-validator"

export const contactValidation = [
  body("name").trim().isLength({ min: 2 }),
  body("email").isEmail().normalizeEmail(),
  body("phone").optional().trim().isLength({ min: 8 }),
  body("subject").trim().isLength({ min: 3 }),
  body("message").trim().isLength({ min: 10 }),
  body("privacy").equals("true").optional(),
]
