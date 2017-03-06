import axios from "axios";
export const ProductsActions = {
	"FETCH_PRODUCTS_FULFILLED": "FETCH_PRODUCTS_FULFILLED",
	"FETCH_PRODUCTS_REJECTED": "FETCH_PRODUCTS_REJECTED",
}
export function fetchProducts() {
	return function(dispatch) {
		axios.get("./samples/products.json")
			.then((response) => {
				dispatch({
					type: ProductsActions.FETCH_PRODUCTS_FULFILLED,
					payload: response.data.result.productCategories
				})
			})
			.catch((err) => {
				dispatch({
					type: ProductsActions.FETCH_PRODUCTS_REJECTED,
					payload: err
				})
			})
	}
}