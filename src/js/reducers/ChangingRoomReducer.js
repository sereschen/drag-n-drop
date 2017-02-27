import {
    ChangingRoomActions
} from "../actions/ChangingRoomActions";

import _ from "lodash";
import update from "immutability-helper";

export default function reducer(state = {
    changingRoomProducts: []
}, action) {
    switch (action.type) {
        case ChangingRoomActions.ADD_PRODUCT_TO_CHANGING_ROOM: {
            return update(state, {
                changingRoomProducts: {
                    $push: [{...action.payload, top : 0 , left : 0}]
                }
            });
        }

        case ChangingRoomActions.MOVE_PRODUCT: {
            const { product , top, left  } = action.payload;
            const index = _.findIndex(state.changingRoomProducts, item => item.productId === product.productId);
            if (index < 0) {
                return state;
            }
            return update(state, {
                changingRoomProducts: {
                    [index]: {                            
                        $merge: {...product, top , left }                            
                    }
                }
            });
        }
    }

    return state
}