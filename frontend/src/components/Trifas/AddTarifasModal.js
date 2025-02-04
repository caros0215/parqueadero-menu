"use client";
import { useState } from "react";
import { Car, Clock, Calendar, Droplet } from "lucide-react";
import "./tarifas-modal.css";

const AddVehicleModal = ({ isOpen, onClose, onSave, vehicle }) => {
  const [focusedInputs, setFocusedInputs] = useState({
    vehiculo: false,
    precioHora: false,
    precioDia: false,
    precioLavado: false,
  });

  const [inputValues, setInputValues] = useState({
    vehiculo: vehicle?.vehiculo || "",
    precioHora: vehicle?.precioHora || "",
    precioDia: vehicle?.precioDia || "",
    precioLavado: vehicle?.precioLavado || "",
  });

  const handleFocus = (field) => {
    setFocusedInputs((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    if (!inputValues[field]) {
      setFocusedInputs((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleChange = (field, value) => {
    setInputValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveClick = () => {
    onSave(inputValues);
    onClose();
  };

  return (
    <>
      <div
        className={`modal fade ${isOpen ? "show" : ""}`}
        style={{
          display: isOpen ? "block" : "none",
          zIndex: 1050,
        }}
      >
        <div className="modal-dialog" style={{ position: "relative", zIndex: 1052 }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{vehicle ? "Editar vehículo" : "Agregar vehículo"}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form>
                {/* Campo: Ingresar vehículo */}
                <div className="form-group mb-3 position-relative">
                  <span className="position-absolute start-0 top-50 translate-middle-y ps-3">
                    <Car className="text-muted1" size={20} />
                  </span>
                  <input
                    type="text"
                    className="form-control ps-5"
                    onFocus={() => handleFocus("vehiculo")}
                    onBlur={() => handleBlur("vehiculo")}
                    onChange={(e) => handleChange("vehiculo", e.target.value)}
                    value={inputValues.vehiculo}
                  />
                  <label className={`floating-label ${focusedInputs.vehiculo || inputValues.vehiculo ? "active" : ""}`}>
                    Ingresar vehículo
                  </label>
                </div>

                {/* Campo: Precio por hora */}
                <div className="form-group mb-3 position-relative">
                  <span className="position-absolute start-0 top-50 translate-middle-y ps-3">
                    <Clock className="text-muted1" size={20} />
                  </span>
                  <input
                    type="number"
                    className="form-control ps-5"
                    onFocus={() => handleFocus("precioHora")}
                    onBlur={() => handleBlur("precioHora")}
                    onChange={(e) => handleChange("precioHora", e.target.value)}
                    value={inputValues.precioHora}
                  />
                  <label className={`floating-label ${focusedInputs.precioHora || inputValues.precioHora ? "active" : ""}`}>
                    Precio por hora
                  </label>
                </div>

                {/* Campo: Precio por día */}
                <div className="form-group mb-3 position-relative">
                  <span className="position-absolute start-0 top-50 translate-middle-y ps-3">
                    <Calendar className="text-muted1" size={20} />
                  </span>
                  <input
                    type="number"
                    className="form-control ps-5"
                    onFocus={() => handleFocus("precioDia")}
                    onBlur={() => handleBlur("precioDia")}
                    onChange={(e) => handleChange("precioDia", e.target.value)}
                    value={inputValues.precioDia}
                  />
                  <label className={`floating-label ${focusedInputs.precioDia || inputValues.precioDia ? "active" : ""}`}>
                    Precio por día
                  </label>
                </div>

                {/* Campo: Precio por lavado */}
                <div className="form-group mb-3 position-relative">
                  <span className="position-absolute start-0 top-50 translate-middle-y ps-3">
                    <Droplet className="text-muted1" size={20} />
                  </span>
                  <input
                    type="number"
                    className="form-control ps-5"
                    onFocus={() => handleFocus("precioLavado")}
                    onBlur={() => handleBlur("precioLavado")}
                    onChange={(e) => handleChange("precioLavado", e.target.value)}
                    value={inputValues.precioLavado}
                  />
                  <label className={`floating-label ${focusedInputs.precioLavado || inputValues.precioLavado ? "active" : ""}`}>
                    Precio por lavado
                  </label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Salir
              </button>
              <button type="button" className="aceptar btn btn-primary" onClick={handleSaveClick}>
                {vehicle ? "Guardar cambios" : "Guardar vehículo"}
              </button>
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

export default AddVehicleModal;