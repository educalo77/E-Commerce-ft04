import React, { useEffect } from "react";
import cComponent from "./css/adminAddUser.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  deleteUser,
  makeAdmin,
} from "../Redux/Users/actions/userActions";
import axios from "axios";

export default function AdminAddUser() {
  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={cComponent.products} ng-app="app" ng-controller="AppCtrl">
      <md-content layout-padding>
        <div className={cComponent.actionpane}>
          <Link to="/admin/orders">
            <button className={cComponent.buttonNew}>Historial Ordenes</button>
          </Link>
          <center>
            <h2>Usuarios</h2>
          </center>
        </div>
        <div className="tables">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <table className="table-responsive-xl mx-auto table-striped table-bordered table-hover table-checkable order-column dataTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Direccion</th>
                  <th>Rol</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  var uId = user.id;
                  const borrar = () => {
                    dispatch(deleteUser(uId));
                  };
                  const hacerAdmin = () => {
                    if (user.rol === "user") {
                      axios
                        .put(`http://localhost:3001/users/${uId}`, {
                          rol: "admin",
                        })
                        .then((data) => {
                          dispatch(makeAdmin(uId));
                        });
                    } else {
                      axios
                        .put(`http://localhost:3001/users/${uId}`, {
                          rol: "user",
                        })
                        .then((data) => {
                          dispatch(makeAdmin(uId));
                        });
                    }
                    return (window.location = "http://localhost:3000/admin");
                  };
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        <span className={cComponent.name}>{user.name}</span>
                      </td>
                      <td>{user.lastname}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.address}</td>
                      <td>{user.rol}</td>
                      <td className={cComponent.botones}>
                        {/* <Link to={`/users/edit/${user.id}`}>
                          <button className={cComponent.editar}>Editar</button>
                        </Link> */}

                        <button onClick={borrar} className={cComponent.borrar}>
                          Eliminar
                        </button>

                        <div className={cComponent.editar}>
                          <button
                            onClick={hacerAdmin}
                            className={cComponent.editar}
                          >
                            Admin/User
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </md-content>
    </div>
  );
}
