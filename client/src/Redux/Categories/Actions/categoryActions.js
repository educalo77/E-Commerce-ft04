import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_EDIT_REQUEST,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_EDIT_FAIL,
  CATEGORY_DELETE_SUCCESS,
} from "../constantes/categoryConstants";
import axios from "axios";

const listCategory = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:3001/categories/");
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
  }
};

const detailsCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DETAILS_REQUEST, payload: categoryId });
    const { data } = await axios.get(
      "http://localhost:3001/categories/" + categoryId
    );
    dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_DETAILS_FAIL, payload: error.message });
  }
};

const editCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_EDIT_REQUEST, payload: category });
    axios
      .put(`http://localhost:3001/categories/${category.id}`, {
        name: `${category.name}`,
      })
      .then((data) => {
        return data;
      });
    dispatch({ type: CATEGORY_EDIT_SUCCESS, payload: category });
    return (window.location = "http://localhost:3000/admin");
  } catch (error) {
    dispatch({ type: CATEGORY_EDIT_FAIL, payload: error.message });
  }
};

const deleteCategory = (categoryId) => async (dispatch) => {
  await axios
    .delete(`http://localhost:3001/categories/${categoryId}`, {
      params: categoryId,
    })
    .then((res) => {
      return res;
    });
  dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: categoryId });
};

export { listCategory, detailsCategory, editCategory, deleteCategory };