import {
    ChangingRoomActions
} from "../actions/ChangingRoomActions";

import _ from "lodash";
import update from "immutability-helper";

export default function reducer(state = {
    products: [],
    preview: {}
}, action) {
    switch (action.type) {
        case ChangingRoomActions.ADD_PRODUCT_TO_CHANGING_ROOM:
            {
                return update(state, {
                    products: {
                        $push: [{...action.payload,
                            top: 0,
                            left: 0,
                        }]
                    }
                });
            }

        case ChangingRoomActions.MOVE_PRODUCT:
            {
                const {
                    product,
                    top,
                    left
                } = action.payload;
                const index = _.findIndex(state.products, item => item.productId === product.productId);
                if (index < 0) {
                    return state;
                }

                const newState = update(state, {
                    products: {
                        [index]: {
                            $merge: {...product,
                                top,
                                left
                            }
                        }
                    }
                });
                return newState;
            }

        case ChangingRoomActions.RESIZE_PRODUCT:
            {
                const {
                    product,
                    width,
                    height
                } = action.payload;
                const index = _.findIndex(state.products, item => item.productId === product.productId);
                if (index < 0) {
                    return state;
                }
                return update(state, {
                    products: {
                        [index]: {
                            $merge: {...product,
                                width,
                                height
                            }
                        }
                    }
                });
            }

        case ChangingRoomActions.DELETE_PRODUCT:
            {
                const {
                    product
                } = action.payload;
                const index = _.findIndex(state.products, (item) => {
                    return item.productId === product.productId
                });
                if (index < 0) {
                    return state;
                }
                return update(state, {
                    products: {
                        $splice: [
                            [index, 1]
                        ]
                    }
                });
            }

        case ChangingRoomActions.SAVE_CHANGING_ROOM:
            {
                return update(state, {
                    preview: {
                        $merge: action.payload
                    }
                });
            }

        case ChangingRoomActions.LOAD_CHANGING_ROOM:
            {
                let newState = update(state, {
                    preview: {
                        $merge: action.payload
                    }
                });
                if (action.payload.products) {
                    newState = update(newState, {
                        products: {
                            $merge: action.payload.products
                        }
                    });
                }

                return newState;

            }
    }

    return state
}