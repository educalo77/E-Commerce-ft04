import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CatalogComponent from "./container/catalogComponent";
import FormProduct from "./container/formProducto.js";
import FormCategory from "./container/formCategory.js";
import ProductComponent from "./container/productComponent";
import HeaderInicio from "./components/headerInicio";
import AdminPanel from "./container/adminPanel";
import EditProduct from './container/EditProduct';
import "./bootstrap.min.css";
import ProductCategory from "./container/productCategory";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact={true} render={() => <HeaderInicio />} />
      <main className="main">
        <div className="content">
          <Route path="/" exact={true} render={() => <CatalogComponent />} />
          <Route path="/admin" exact={true} render={() => <AdminPanel />} />
          <Route
            path="/admin/products/add"
            exact={true}
            render={() => <FormProduct />}
          />
          <Route
            path="/admin/categories/add"
            exact={true}
            render={() => <FormCategory />}
          />
          <Route
            path="/product/:id"
            exact={true}
            render={(p) => {
              console.log(p);
              return <ProductComponent img={p.location.state.img} producto={p.match.params.id} />;
            }}
          />
          <Route
            path='/admin/products/edit/:id'
            exact={true}
            render={(p) => {
              console.log(p.match.params.id)
              return <EditProduct producto={p.match.params.id} />
            }}
          />
          <Route
            path="/products/categoria/"
            exact={false}
            render={(c) =>  <ProductCategory />}
            
          />
        </div>
      </main>
    </BrowserRouter>
  );
}
export default App;
