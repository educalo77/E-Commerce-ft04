import React, { useEffect } from "react";
import sBar from "./css/sideBarComponent.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../Redux/Categories/Actions/categoryActions";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";
import { removeFromCart } from "../Redux/Cart/Actions/cartActions";


function SideBarComponent(props) {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loadingCat, errorCat } = categoryList;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  const logout = (e) => {
    e.preventDefault();
    cartItems.map((el) => dispatch(removeFromCart(el.product)));
    axios.get("http://localhost:3001/users/logout").then((data) => {
      localStorage.removeItem("user");
      if (data.data.logout) {
        return (window.location = "/users/login");
      }
    });
  };

  return (
    <div>
      <div>
        {JSON.parse(localStorage.getItem("user")) ? (
          <h4>Hola,{JSON.parse(localStorage.getItem("user")).name}</h4>
        ) : (
          <div className={sBar.auth}>
            <Link to="/users/login">
              <button onClick={props.onclose} className={sBar.signIn} href="#">
                Iniciar Sesion
              </button>
            </Link>
            <Link to="/users/signup">
              <button onClick={props.onclose} className={sBar.signUp} href="#">
                Registrarse
              </button>
            </Link>
          </div>
        )}
        <button className={sBar.closeButton} onClick={props.onclose}>
          x
        </button>
        <label className={sBar.filtro}>Filtrar por categoria: </label>
        <div className={sBar.categories}>
          {loadingCat ? (
            <div className="alert alert-success">Cargando...</div>
          ) : errorCat ? (
            <div className="alert alert-danger">
              Se produjo un error, por favor inténtelo de nuevo más tarde.
            </div>
          ) : (
            categories.length > 0 &&
            categories.map((cat) => (
              <div key={cat.id}>
                <Link to={"/products/categoria/" + cat.name}>
                  <button className={sBar.category}>
                    <p className={sBar.botoncat}>{cat.name}</p>
                  </button>
                </Link>
              </div>
            ))
          )}
        </div>

        <div className={`${sBar.admin}`}>
          {JSON.parse(localStorage.getItem("user")) &&
            JSON.parse(localStorage.getItem("user")).rol === "admin" && (
              <Link to="/admin">
                <button onClick={props.onclose} className={` ${sBar.boton} `}>
                  <SupervisorAccountIcon />
                </button>
              </Link>
            )}
          <button onClick={logout} className={`${sBar.boton}`}>
            <ExitToAppIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBarComponent;
