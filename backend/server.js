const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const cors = require("cors")
const path = require("path")
const apiRoutes = require("./routes/api")

const app = express()
const port = 3001

// Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

// Middleware para parsear JSON
app.use(bodyParser.json())

// Configuración de sesión
app.use(
  session({
    secret: "tu-clave-secreta-aqui",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
    },
  }),
)

// Rutas API
app.use("/api", apiRoutes)

// Servir archivos estáticos en producción
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))
}

// Esta ruta debe ir DESPUÉS de tus rutas API
// Maneja todas las peticiones que no sean API
app.get("*", (req, res) => {
  // En desarrollo, redirige a React
  if (process.env.NODE_ENV !== "production") {
    res.redirect("http://localhost:3000")
    return
  }
  // En producción, sirve el archivo index.html
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
})

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})

