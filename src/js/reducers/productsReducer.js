import {
  ProductsActions
} from "../actions/productsActions";

export default function reducer(state = {
  products: []
}, action) {

  switch (action.type) {
    case ProductsActions.FETCH_PRODUCTS_REJECTED:
      {
        return {...state,
          fetching: false,
          error: action.payload
        }
      }
    case ProductsActions.FETCH_PRODUCTS_FULFILLED:
      {
        return {
          ...state,
          products: action.payload,
        }
      }
  }

  return state
}