export default function reducer(state={
      products : []
  }, action) {

    switch (action.type) {
      case "FETCH_PRODUCTS": {
        return {...state, fetching: true}
      }
      case "FETCH_PRODUCTS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_PRODUCTS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          products: action.payload,
        }
      }
      case "ADD_PRODUCT": {
        return {
          ...state,
          products: [...state.products, action.payload],
        }
      }
    }

    return state
}
