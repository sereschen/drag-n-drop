import {ADD_PRODUCT_TO_CHANGING_ROOM} from "../actions/ChangingRoomActions";


export default function reducer(state = {
  changingRoomProducts: []
}, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CHANGING_ROOM:
      {
        return {...state,
          changingRoomProducts: [...state.changingRoomProducts, action.payload]
        }
      }
  }

  return state
}