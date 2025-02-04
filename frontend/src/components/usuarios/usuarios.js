"use client";
import { React, useState } from "react";
import { Pencil, Trash2, UserCircle2 } from "lucide-react";
import Swal from 'sweetalert2';
import styles from "./usuarios.module.css";
import AddUserModal from "./AddUserModal";

const users = [
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
];

export default function UserManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSave = (userData) => {
    if (userData.id) {
      // Update existing user
      console.log("Updating user:", userData);
    } else {
      // Create new user
      console.log("Creating user:", userData);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al usuario ${user.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c59951',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí va la lógica para eliminar el usuario
        console.log('Eliminando usuario:', user.id);
        Swal.fire(
          'Eliminado!',
          'El usuario ha sido eliminado.',
          'success'
        );
      }
    });
  };

  return (
    <div className={styles.containerFluid1}>
      <div className={styles.headerSection1}>
        <h2 className={styles.title1}>Administrar usuarios</h2>
      </div>

      <button className={styles.btnAdd1} onClick={() => setIsModalOpen(true)}>
        Agregar usuario
      </button>

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSave={handleSave}
      />

      <div className={styles.tableWrapper1}>
        <div className={styles.tableContainer1}>
          <table className={styles.usersTable1}>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Foto</th>
                <th>Perfil</th>
                <th>Estado</th>
                <th>Último login</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
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
    </div>
  );
}
