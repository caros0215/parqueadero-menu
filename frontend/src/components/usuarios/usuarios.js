"use client"

import React from 'react'
import { Pencil, Trash2, UserCircle2 } from 'lucide-react'
import styles from './usuarios.module.css'

const users = [
  {
    id: 1,
    name: "Usuario Administrador",
    username: "admin",
    profile: "Administrador",
    status: "Activado",
    lastLogin: "2017-12-11 12:05:32"
  },
  {
    id: 2,
    name: "Usuario Administrador",
    username: "admin",
    profile: "Administrador",
    status: "Activado",
    lastLogin: "2017-12-11 12:05:32"
  },
  {
    id: 3,
    name: "Usuario Administrador",
    username: "admin",
    profile: "Administrador",
    status: "Desactivado",
    lastLogin: "2017-12-11 12:05:32"
  }
]

export default function UserManagement() {
  return (
    <div className={styles.containerFluid1}>
      <div className={styles.headerSection1}>
        <h2 className={styles.title1}>Administrar usuarios</h2>
        <button className={styles.btnAdd1}>
          Agregar usuario
        </button>
      </div>

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
                    <UserCircle2 
                      size={32} 
                      className={styles.userIcon1}
                    />
                  </td>
                  <td>{user.profile}</td>
                  <td>
                    <span className={`${styles.statusBadge1} ${user.status === 'Activado' ? styles.active1 : styles.inactive1}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <div className={styles.actionButtons1}>
                      <button className={styles.btnEdit1}>
                        <Pencil size={16} />
                      </button>
                      <button className={styles.btnDelete1}>
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
  )
}
