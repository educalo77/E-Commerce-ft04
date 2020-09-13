import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_FAIL,
} from "../constantes/productConstants";
import axios from "axios";

const listProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:3001/products/");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get(
      "http://localhost:3001/products/" + productId
    );
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const editProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_EDIT_REQUEST, payload: product });
    // const { data } = await axios.put(
    //   "http://localhost:3001/products/" + productId
    // );
    axios
      .put(`http://localhost:3001/products/${product.id}`, {
        name: `${product.name}`,
        description: `${product.description}`,
        category: `${product.category}`,
        price: `${product.price}`,
        img: `${product.img}`,
        stock: `${product.stock}`,
      })
      .then((data) => {
        return data;
      });
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: product });
    return (window.location = "http://localhost:3000/admin");
  } catch (error) {
    dispatch({ type: PRODUCT_EDIT_FAIL, payload: error.message });
  }
};

export { listProduct, detailsProduct, editProduct };
