export const ChangingRoomActions = {
	ADD_PRODUCT_TO_CHANGING_ROOM : 'ADD_PRODUCT_TO_CHANGING_ROOM',
	MOVE_PRODUCT : 'MOVE_PRODUCT',
	RESIZE_PRODUCT : 'RESIZE_PRODUCT',
	DELETE_PRODUCT : 'DELETE_PRODUCT',
}
export function addProduct(product) {
	return function(dispatch) {
		dispatch({
			type: ChangingRoomActions.ADD_PRODUCT_TO_CHANGING_ROOM,
			payload: product.product
		});
	}
}

export function deleteProduct(product) {
	return function(dispatch) {
		dispatch({
			type: ChangingRoomActions.DELETE_PRODUCT,
			payload: {product : product}
		});
	}
}

export function moveProduct(product, left, top) {
	return function(dispatch) {
		dispatch({
			type: ChangingRoomActions.MOVE_PRODUCT,
			payload: {
				product,
				left,
				top
			}
		});
	}
}

export function resizeProduct(product, width, height) {
	return function(dispatch) {
		dispatch({
			type: ChangingRoomActions.RESIZE_PRODUCT,
			payload: {
				product,
				width,
				height
			}
		});
	}
}