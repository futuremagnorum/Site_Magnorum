import express from "express"
import helmet from "helmet"
import cors from "cors"
import rateLimit from "express-rate-limit"
import contactRoutes from "./routes/contact.routes.js"

const app = express()

// Headers seguros
app.use(helmet())

// JSON protegido
app.use(express.json({ limit: "10kb" }))

// CORS (ajuste domínio depois)
app.use(
  cors({
    origin: "*",
    methods: ["POST"],
  })
)

// Rate limit global
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
)

// Rotas
app.use("/api/contact", contactRoutes)

// Fallback
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Rota não encontrada" })
})

export default app
