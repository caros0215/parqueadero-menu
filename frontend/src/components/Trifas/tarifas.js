import { React, useState, useMemo } from "react";
import {
  Pencil,
  Trash2,
  Search,
  ArrowDownUp,
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
} from "lucide-react";
import Swal from "sweetalert2";
import styles from "./tarifas.module.css";
import AddVehicleModal from "./AddTarifasModal";

const VehicleManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      numero: "001",
      vehiculo: "Toyota Corolla",
      precioHora: 10,
      precioDia: 100,
      precioLavado: 20,
    },
    {
      id: 2,
      numero: "002",
      vehiculo: "Honda Civic",
      precioHora: 12,
      precioDia: 120,
      precioLavado: 25,
    },
    {
      id: 3,
      numero: "003",
      vehiculo: "Ford Mustang",
      precioHora: 15,
      precioDia: 150,
      precioLavado: 30,
    },
  ]);

  // Sorting function
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filtered and sorted vehicles
  const filteredAndSortedVehicles = useMemo(() => {
    let filtered = [...vehicles];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((vehicle) =>
        Object.values(vehicle).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [vehicles, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedVehicles.length / itemsPerPage);
  const paginatedVehicles = filteredAndSortedVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const firstRecord = (currentPage - 1) * itemsPerPage + 1;
  const lastRecord = Math.min(
    currentPage * itemsPerPage,
    filteredAndSortedVehicles.length
  );

  // Handle edit vehicle
  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  // Handle save vehicle
  const handleSave = (vehicleData) => {
    if (vehicleData.id) {
      // Editar vehículo existente
      setVehicles(
        vehicles.map((vehicle) =>
          vehicle.id === vehicleData.id ? { ...vehicle, ...vehicleData } : vehicle
        )
      );
    } else {
      // Agregar nuevo vehículo
      setVehicles([...vehicles, { ...vehicleData, id: vehicles.length + 1 }]);
    }
    setIsModalOpen(false); // Cerrar el modal
    setSelectedVehicle(null); // Limpiar el vehículo seleccionado
  };

  // Handle delete vehicle
  const handleDelete = (vehicle) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas eliminar el vehículo ${vehicle.vehiculo}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c59951",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setVehicles(vehicles.filter((v) => v.id !== vehicle.id)); // Eliminar el vehículo
        Swal.fire("Eliminado!", "El vehículo ha sido eliminado.", "success");
      }
    });
  };

  // Render sort indicator
  const SortIndicator = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      // Estado inicial (sin ordenar)
      return <ArrowDownUp className="opacity-50 w-4 h-4 inline-block ml-1" />;
    }
    // Orden ascendente
    if (sortConfig.direction === "asc") {
      return <ArrowDownNarrowWide className="w-4 h-4 inline-block ml-1" />;
    }
    // Orden descendente
    return <ArrowDownWideNarrow className="w-4 h-4 inline-block ml-1" />;
  };

  return (
    <div className={styles.containerFluid1}>
      <div className={styles.headerSection1}>
        <h2 className={styles.title1}>Administrar vehículos</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className={styles.agregar}>
          <button
            className={styles.btnAdd1}
            onClick={() => {
              setSelectedVehicle(null);
              setIsModalOpen(true);
            }}
          >
            Agregar vehículo
          </button>
        </div>

        <div className={styles.ancho}>
          <div className={`${styles.relative} ${styles.buscador}`}>
            <Search style={{ color: "#c59951" }} />
            <input
              type="text"
              placeholder="Buscar vehículos..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className={styles.cuadro}
            />
          </div>

          <div className={styles.cantidad}>
            <span className={styles.mostrar}>Mostrar </span>
            <select
              style={{ backgroundColor: "#031632", color: "#ffffff" }}
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className={styles.mostrar}> registros</span>
          </div>
        </div>
      </div>

      <div className={styles.tableWrapper1}>
        <div className={styles.tableContainer1}>
          <table className={styles.usersTable1}>
            <thead>
              <tr>
                <th onClick={() => requestSort("numero")} className="cursor-pointer">
                  <div className="flex items-center">
                    Número <SortIndicator columnKey="numero" />
                  </div>
                </th>
                <th onClick={() => requestSort("vehiculo")} className="cursor-pointer">
                  <div className="flex items-center">
                    Vehículo <SortIndicator columnKey="vehiculo" />
                  </div>
                </th>
                <th onClick={() => requestSort("precioHora")} className="cursor-pointer">
                  <div className="flex items-center">
                    Precio por hora <SortIndicator columnKey="precioHora" />
                  </div>
                </th>
                <th onClick={() => requestSort("precioDia")} className="cursor-pointer">
                  <div className="flex items-center">
                    Precio por día <SortIndicator columnKey="precioDia" />
                  </div>
                </th>
                <th onClick={() => requestSort("precioLavado")} className="cursor-pointer">
                  <div className="flex items-center">
                    Precio por lavado <SortIndicator columnKey="precioLavado" />
                  </div>
                </th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedVehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.numero}</td>
                  <td>{vehicle.vehiculo}</td>
                  <td>${vehicle.precioHora}</td>
                  <td>${vehicle.precioDia}</td>
                  <td>${vehicle.precioLavado}</td>
                  <td>
                    <div className={styles.actionButtons1}>
                      <button
                        className={styles.btnEdit1}
                        onClick={() => handleEdit(vehicle)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className={styles.btnDelete1}
                        onClick={() => handleDelete(vehicle)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4 px-4">
        <div className={styles.informacion}>
          Mostrando registros del{" "}
          {filteredAndSortedVehicles.length > 0 ? firstRecord : 0} al {lastRecord}{" "}
          de un total de {filteredAndSortedVehicles.length} registros
        </div>
        <div className={styles.siguiente}>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              style={{ backgroundColor: "#031632", color: "#c59951" }}
            >
              Anterior
            </button>
            <div
              style={{
                marginLeft: "98%",
                marginTop: "-33%",
                backgroundColor: "#031632!important",
              }}
              className="flex items-center gap-1"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === page ? " " : ""
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              style={{
                backgroundColor: "#031632",
                color: "#c59951",
                marginTop: "-33%",
                float: "right",
                marginRight: "-145%",
              }}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
      <AddVehicleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedVehicle(null);
        }}
        onSave={handleSave}
        vehicle={selectedVehicle}
      />
    </div>
  );
};

export default VehicleManagement;