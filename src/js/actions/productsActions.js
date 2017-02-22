import axios from "axios";

export function fetchProducts() {
  return function(dispatch) {
    axios.get("./samples/products.json")
      .then((response) => {
        dispatch({type: "FETCH_PRODUCTS_FULFILLED", payload: response.data.result.productCategories})
      })
      .catch((err) => {
        dispatch({type: "FETCH_PRODUCTS_REJECTED", payload: err})
      })
  }
}
