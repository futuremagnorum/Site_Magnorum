import nodemailer from "nodemailer"
import { validationResult } from "express-validator"

export async function sendContact(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Dados inválidos",
    })
  }

  const { name, email, phone, subject, message } = req.body

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Contato Magnorum" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: `📩 ${subject}`,
      text: `
Nome: ${name}
Email: ${email}
Telefone: ${phone || "Não informado"}

Mensagem:
${message}
      `,
    })

    return res.json({ success: true })
  } catch (error) {
    console.error("Erro ao enviar email:", error)

    return res.status(500).json({
      success: false,
      message: "Erro interno no servidor",
    })
  }
}
