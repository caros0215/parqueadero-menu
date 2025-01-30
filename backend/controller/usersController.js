const loginUser = async (req, res) => {
    try {
      const { ingUsuario, ingPassword } = req.body
  
      // Validación de campos requeridos
      if (!ingUsuario || !ingPassword) {
        return res.status(400).json({
          success: false,
          error: "Usuario y contraseña son requeridos",
        })
      }
  
      // Aquí deberías agregar la lógica de verificación con tu base de datos
      // Este es un ejemplo simplificado
      if (ingUsuario === "admin" && ingPassword === "admin") {
        const userData = {
          id: 1,
          username: ingUsuario,
          nombre: "Administrador",
          rol: "admin",
        }
  
        // Guardar en sesión
        req.session.user = userData
  
        return res.status(200).json({
          success: true,
          message: "Login exitoso",
          user: userData,
        })
      }
  
      // Si las credenciales no son correctas
      return res.status(401).json({
        success: false,
        error: "Usuario o contraseña incorrectos",
      })
    } catch (error) {
      console.error("Error en login:", error)
      res.status(500).json({
        success: false,
        error: "Error en el servidor",
      })
    }
  }
  
  module.exports = {
    loginUser,
  }
  
  