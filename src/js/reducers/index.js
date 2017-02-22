import { combineReducers } from "redux"

import products from "./productsReducer"
import changingRoom from "./ChangingRoomReducer"

export default combineReducers({
  products,
  changingRoom,
})
