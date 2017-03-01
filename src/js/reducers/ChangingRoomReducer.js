import { ChangingRoomActions } from "../actions/ChangingRoomActions";

import _ from "lodash";
import update from "immutability-helper";

export default function reducer(state = {
    products: []
}, action) {
    switch (action.type) {
        case ChangingRoomActions.ADD_PRODUCT_TO_CHANGING_ROOM: {
            return update(state, {
                products: {
                    $push: [{...action.payload,
                        top: 0,
                        left: 0,
                        width: 300,
                        height: 300
                    }]
                }
            });
        }

        case ChangingRoomActions.MOVE_PRODUCT: {
            const { product , top, left  } = action.payload;
            const index = _.findIndex(state.products, item => item.productId === product.productId);
            if (index < 0) {
                return state;
            }
            return update(state, {
                products: {
                    [index]: {                            
                        $merge: {...product, top , left }                            
                    }
                }
            });
        }

        case ChangingRoomActions.RESIZE_PRODUCT: {
            const { product , width , height} = action.payload;
            const index = _.findIndex(state.products, item => item.productId === product.productId);
            if (index < 0) {
                return state;
            }
            return update(state, {
                products: {
                    [index]: {                            
                        $merge: {...product, width , height }                            
                    }
                }
            });
        }

        case ChangingRoomActions.DELETE_PRODUCT: {
            const { product } = action.payload;
            const index = _.findIndex(state.products, (item) =>{ 
                return item.productId === product.productId
            });
            if (index < 0) {
                return state;
            }
            return update(state, {
                products: {
                    $splice: [[index,1]]
                }
            });
        }
    }

    return state
}