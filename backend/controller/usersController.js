const db = require('../config/database');
const bcrypt = require('bcryptjs');

const loginUser = (req, res) => {
  const { ingUsuario, ingPassword } = req.body;

  if (!ingUsuario || !ingPassword) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const query = 'SELECT * FROM usuarios WHERE usuario = ?';
  db.query(query, [ingUsuario], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(ingPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    if (user.estado !== 1) {
      return res.status(403).json({ error: 'User is not activated' });
    }

    // Set session data
    req.session.user = {
      id: user.id,
      nombre: user.nombre,
      usuario: user.usuario,
      foto: user.foto,
      perfil: user.perfil
    };

    // Update last login time
    const lastLogin = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const updateQuery = 'UPDATE usuarios SET ultimo_login = ? WHERE id = ?';
    db.query(updateQuery, [lastLogin, user.id], (err, updateResult) => {
      if (err) {
        return res.status(500).json({ error: 'Error updating last login' });
      }
      // Respond with JSON indicating success
      res.status(200).json({
        message: 'Login successful',
        user: req.session.user  // Puedes enviar información adicional del usuario si es necesario
    });
    
    });
  });
};

module.exports = {
  loginUser
};
