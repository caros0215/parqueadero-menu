import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import backgroundImage from '../../assets/img/13.jpg';
import logoImage from '../../assets/img/12.png';

function LoginPage() {
    const navigate = useNavigate();
    const [ingUsuario, setIngUsuario] = useState("");
    const [ingPassword, setIngPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Validación inicial
        if (!ingUsuario.trim() || !ingPassword.trim()) {
            setError("Usuario y contraseña son requeridos");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ingUsuario, ingPassword }),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Login exitoso:", data);
                // Guardar sesión
                localStorage.setItem('session', JSON.stringify(data));
                // Redireccionar
                navigate('/inicio');
            } else {
                // Manejar diferentes tipos de errores
                switch (response.status) {
                    case 400:
                        setError("Usuario y contraseña son requeridos");
                        break;
                    case 401:
                        setError("Usuario o contraseña incorrectos");
                        break;
                    case 403:
                        setError("Usuario no activado");
                        break;
                    case 500:
                        setError("Error del servidor. Por favor, intenta más tarde");
                        break;
                    default:
                        setError(data.error || "Error al iniciar sesión");
                }
            }
        } catch (error) {
            setError("Error de conexión. Por favor, verifica tu conexión a internet e intenta de nuevo.");
            console.error("Error de fetch:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-background" style={{backgroundImage: `url(${backgroundImage})`}}></div>
            <div className="login-card">
                <div className="text-center mb-4">
                    <img src={logoImage || "/placeholder.svg"} alt="Logo" className="login-logo" />
                </div>

                <form onSubmit={handleLogin}>
                    <div className="form-group mb-4">
                        <input
                            type="text"
                            className="form-control custom-input"
                            id="ingUsuario"
                            placeholder=""
                            value={ingUsuario}
                            onChange={(e) => setIngUsuario(e.target.value)}
                            required
                        />
                        <label htmlFor="ingUsuario" className="custom-label">Usuario</label>
                    </div>
                    <div className="form-group mb-4">
                        <input
                            type="password"
                            className="form-control custom-input"
                            id="ingPassword"
                            placeholder=""
                            value={ingPassword}
                            onChange={(e) => setIngPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="ingPassword" className="custom-label">Contraseña</label>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button
                        type="submit"
                        className="btn btn-primary login-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;