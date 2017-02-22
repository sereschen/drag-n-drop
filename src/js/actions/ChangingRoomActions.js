export const ADD_PRODUCT_TO_CHANGING_ROOM = 'ADD_PRODUCT_TO_CHANGING_ROOM';

export function addProductToChangingRoom(product) {
	return function(dispatch) {
		dispatch({
			type : ADD_PRODUCT_TO_CHANGING_ROOM,
			payload : product
		});
	}
}


