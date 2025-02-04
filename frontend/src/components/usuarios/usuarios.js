import { React, useState, useMemo } from "react";
import {
  Pencil,
  Trash2,
  UserCircle2,
  Search,
  ArrowDownUp,
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
} from "lucide-react";
import Swal from "sweetalert2";
import styles from "./usuarios.module.css";
import UserModal from "./AddUserModal";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Usuario Administrador",
      username: "admin",
      profile: "Administrador",
      status: "Activado",
      lastLogin: "2017-12-11 12:05:32",
    },
    {
      id: 2,
      name: "Usuario Administrador",
      username: "admin",
      profile: "Administrador",
      status: "Activado",
      lastLogin: "2017-12-11 12:05:32",
    },
    {
      id: 3,
      name: "Usuario Administrador",
      username: "admin",
      profile: "Administrador",
      status: "Desactivado",
      lastLogin: "2017-12-11 12:05:32",
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

  // Filtered and sorted users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = [...users];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((user) =>
        Object.values(user).some((value) =>
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
  }, [users, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const paginatedUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const firstRecord = (currentPage - 1) * itemsPerPage + 1;
  const lastRecord = Math.min(
    currentPage * itemsPerPage,
    filteredAndSortedUsers.length
  );

  // Handle edit user
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Handle save user
  const handleSave = (userData) => {
    if (userData.id) {
      // Editar usuario existente
      setUsers(
        users.map((user) =>
          user.id === userData.id ? { ...user, ...userData } : user
        )
      );
    } else {
      // Agregar nuevo usuario
      setUsers([...users, { ...userData, id: users.length + 1 }]);
    }
    setIsModalOpen(false); // Cerrar el modal
    setSelectedUser(null); // Limpiar el usuario seleccionado
  };

  // Handle delete user
  const handleDelete = (user) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas eliminar al usuario ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c59951",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter((u) => u.id !== user.id)); // Eliminar el usuario
        Swal.fire("Eliminado!", "El usuario ha sido eliminado.", "success");
      }
    });
  };

  // Toggle user status
  const toggleStatus = (userId) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          const newStatus =
            user.status === "Activado" ? "Desactivado" : "Activado";
          return { ...user, status: newStatus };
        }
        return user;
      })
    );
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
        <h2 className={styles.title1}>Administrar usuarios</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className={styles.agregar}>
          <button
            className={styles.btnAdd1}
            onClick={() => {
              setSelectedUser(null);
              setIsModalOpen(true);
            }}
          >
            Agregar usuario
          </button>
        </div>

        <div className={styles.ancho}>
          <div className={`${styles.relative} ${styles.buscador}`}>
            <Search style={{ color: "#c59951" }} />
            <input
              type="text"
              placeholder="Buscar usuarios..."
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
                <th
                  onClick={() => requestSort("id")}
                  className="cursor-pointer"
                >
                  <div className="flex items-center">
                    # <SortIndicator columnKey="id" />
                  </div>
                </th>
                <th
                  onClick={() => requestSort("name")}
                  className="cursor-pointer"
                >
                  <div className="flex items-center">
                    Nombre <SortIndicator columnKey="name" />
                  </div>
                </th>
                <th
                  onClick={() => requestSort("username")}
                  className="cursor-pointer"
                >
                  <div className="flex items-center">
                    Usuario <SortIndicator columnKey="username" />
                  </div>
                </th>
                <th>Foto</th>
                <th
                  onClick={() => requestSort("profile")}
                  className="cursor-pointer"
                >
                  <div className="flex items-center">
                    Perfil <SortIndicator columnKey="profile" />
                  </div>
                </th>
                <th
                  onClick={() => requestSort("status")}
                  className="cursor-pointer"
                >
                  <div className="flex items-center">
                    Estado <SortIndicator columnKey="status" />
                  </div>
                </th>
                <th
                  onClick={() => requestSort("lastLogin")}
                  className="cursor-pointer"
                >
                  <div className="flex items-center">
                    Último login <SortIndicator columnKey="lastLogin" />
                  </div>
                </th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>
                    <UserCircle2 size={32} className={styles.userIcon1} />
                  </td>
                  <td>{user.profile}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge1} ${
                        user.status === "Activado"
                          ? styles.active1
                          : styles.inactive1
                      }`}
                      onClick={() => toggleStatus(user.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <div className={styles.actionButtons1}>
                      <button
                        className={styles.btnEdit1}
                        onClick={() => handleEdit(user)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className={styles.btnDelete1}
                        onClick={() => handleDelete(user)}
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
          {filteredAndSortedUsers.length > 0 ? firstRecord : 0} al {lastRecord}{" "}
          de un total de {filteredAndSortedUsers.length} registros
        </div>
        <div className={styles.siguiente}>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              style={{backgroundColor:'#031632',color:'#c59951'}}
            >
              Anterior
            </button>
            <div style={{marginLeft:'98%',marginTop:'-33%', backgroundColor:'#031632!important'}} className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button 
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === page
                        ? " "
                        : ""
                    }`}
                  > 
                    {page}
                  </button>
                )
              )}
            </div>
            <button style={{backgroundColor:'#031632',color:'#c59951',marginTop: '-33%',float: 'right',marginRight: '-145%'}}
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
      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSave={handleSave}
      />
    </div>
  );
};

export default UserManagement;
