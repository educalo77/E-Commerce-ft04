import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import cComponent from "./css/adminAddCategory.module.css";
import { Link } from "react-router-dom";
import {
  listCategory,
  deleteCategory,
} from "../Redux/Categories/Actions/categoryActions";

export default function AdminAddCategory() {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loadingCat, errorCat } = categoryList;
  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  return (
    <div className={cComponent.products} ng-app="app" ng-controller="AppCtrl">
      <md-content layout-padding>
        <div className={cComponent.actionpane}>
          <Link to="/admin/categories/add">
            <button className={cComponent.buttonNew}>Nueva Categoria</button>
          </Link>
          <center>
            <h2>Categorías</h2>
          </center>
        </div>

        <div className="tables">
          <table className="table  table-striped table-bordered table-hover table-checkable order-column dataTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Fecha de creacion</th>
                <th>Ultima modificacion</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.map((category) => {
                  var cId = category.id;
                  const borrar = () => {
                    console.log(cId);
                    dispatch(deleteCategory(cId));
                  };
                  return loadingCat ? (
                    <div className="alert alert-success">Cargando...</div>
                  ) : errorCat ? (
                    <div className="alert alert-danger">
                      Se produjo un error, por favor inténtelo de nuevo más
                      tarde.
                    </div>
                  ) : (
                    <tr key={cId}>
                      <td>{category.id}</td>
                      <td>
                        <span className={cComponent.name}>{category.name}</span>
                      </td>
                      <td>{category.createdAt}</td>
                      <td>{category.updatedAt}</td>
                      <td className={cComponent.botones}>
                        <Link to={`/admin/categories/edit/${category.id}`}>
                          <button className={cComponent.editar}>Editar</button>
                        </Link>
                        <button onClick={borrar} className={cComponent.borrar}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </md-content>
    </div>
  );
}
