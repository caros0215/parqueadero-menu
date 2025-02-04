"use client"
import { useState } from 'react';
import { User, Mail, Lock, UserCircle, Image } from 'lucide-react';
import './user-modal.css';

const AddUserModal = ({ isOpen, onClose }) => {
  const [focusedInputs, setFocusedInputs] = useState({
    name: false,
    email: false,
    password: false,
    profile: false,
    file: false
  });
  
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    password: '',
    profile: '',
    file: ''
  });

  const [imagePreview, setImagePreview] = useState(null); // Estado para la URL de la imagen

  const handleFocus = (field) => {
    setFocusedInputs(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    if (!inputValues[field]) {
      setFocusedInputs(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleChange = (field, value) => {
    setInputValues(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Guardar la URL de la imagen en el estado
      };
      reader.readAsDataURL(file);
      handleChange('file', file.name);
    } else {
      setImagePreview(null); // Limpiar la imagen si no se selecciona ninguna
      handleChange('file', '');
    }
  };

  return (
    <>
      <div 
        className={`modal fade ${isOpen ? 'show' : ''}`} 
        style={{ 
          display: isOpen ? 'block' : 'none',
          zIndex: 1050 
        }}
      >
        <div className="modal-dialog" style={{ position: 'relative', zIndex: 1052 }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar usuario</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group mb-3 position-relative">
                  <span className="position-absolute start-0 top-50 translate-middle-y ps-3">
                    <User className="text-muted1" size={20} />
                  </span>
                  <input
                    type="text"
                    className="form-control ps-5"
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                    onChange={(e) => handleChange('name', e.target.value)}
                    value={inputValues.name}
                  />
                  <label className={`floating-label ${focusedInputs.name || inputValues.name ? 'active' : ''}`}>
                    Ingresar nombre
                  </label>
                </div>

                <div className="form-group mb-3 position-relative">
                  <span className="position-absolute start-0 top-50 translate-middle-y ps-3">
                    <Mail className="text-muted1" size={20} />
                  </span>
                  <input
                    type="email"
                    className="form-control ps-5"
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    onChange={(e) => handleChange('email', e.target.value)}
                    value={inputValues.email}
                  />
                  <label className={`floating-label ${focusedInputs.email || inputValues.email ? 'active' : ''}`}>
                    correo
                  </label>
                </div>

                <div className="form-group mb-3 position-relative">
                  <span className="position-absolute start-0 top-50 translate-middle-y ps-3">
                    <Lock className="text-muted1" size={20} />
                  </span>
                  <input
                    type="password"
                    className="form-control ps-5"
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    onChange={(e) => handleChange('password', e.target.value)}
                    value={inputValues.password}
                  />
                  <label className={`floating-label ${focusedInputs.password || inputValues.password ? 'active' : ''}`}>
                    Contraseña
                  </label>
                </div>

                <div className="form-group mb-3 position-relative">
                  <span className="position-absolute start-0 top-50 translate-middle-y ps-3">
                    <UserCircle className="text-muted1" size={20} />
                  </span>
                  <select 
                    className="form-select ps-5"
                    onFocus={() => handleFocus('profile')}
                    onBlur={() => handleBlur('profile')}
                    onChange={(e) => handleChange('profile', e.target.value)}
                    value={inputValues.profile}
                  >
                    <option value="">Seleccionar perfil</option>
                  </select>
                </div>

                <div className="form-group mb-3 position-relative">
                  <input
                    type="file"
                    className="form-control ps-5"
                    onFocus={() => handleFocus('file')}
                    onBlur={() => handleBlur('file')}
                    onChange={handleFileChange}
                  />
                  <div className="form-text">Peso máximo 6 a 100 MB</div>
                  {imagePreview && (
                    <div className="imagen mt-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{ width: '100px', height: 'auto' }} 
                      />
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Salir</button>
              <button type="button" className="aceptar btn btn-primary">Guardar usuario</button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div 
          className="modal-backdrop fade show" 
          style={{ zIndex: 1049 }}
        ></div>
      )}
    </>
  );
};

export default AddUserModal;