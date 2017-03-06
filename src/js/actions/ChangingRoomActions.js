import domtoimage from 'dom-to-image';

export const ChangingRoomActions = {
	ADD_PRODUCT_TO_CHANGING_ROOM: 'ADD_PRODUCT_TO_CHANGING_ROOM',
	MOVE_PRODUCT: 'MOVE_PRODUCT',
	RESIZE_PRODUCT: 'RESIZE_PRODUCT',
	DELETE_PRODUCT: 'DELETE_PRODUCT',
	SAVE_CHANGING_ROOM: 'SAVE_CHANGING_ROOM',
	LOAD_CHANGING_ROOM: 'LOAD_CHANGING_ROOM',
}
export function addProduct(product) {
	return function(dispatch) {
		dispatch({
			type: ChangingRoomActions.ADD_PRODUCT_TO_CHANGING_ROOM,
			payload: product.product
		});
	}
}

export function loadChangingRoom(node) {
	return function(dispatch) {
		let preview = {};
		if (localStorage.changingRoom) {
			preview = JSON.parse(localStorage.changingRoom) || {};
			const width = window.getComputedStyle(node).getPropertyValue("width").replace('px', '');
			const height = window.getComputedStyle(node).getPropertyValue("height").replace('px', '');
			if (preview.products) {
				preview.products = preview.products.map(item => {

					return {
						...item,
						width: ((item.width.replace('%', '') * width) / 100),
						height: ((item.height.replace('%', '') * height) / 100),
						top: ((item.top.replace('%', '') * height) / 100),
						left: ((item.left.replace('%', '') * width) / 100),
					}
				});
			}
		}

		dispatch({
			type: ChangingRoomActions.LOAD_CHANGING_ROOM,
			payload: preview
		});
	}
}

export function deleteProduct(product) {
	return function(dispatch) {
		dispatch({
			type: ChangingRoomActions.DELETE_PRODUCT,
			payload: {
				product: product
			}
		});
	}
}

export function saveChangingRoom(node, products) {
	return (dispatch) => {

		const width = window.getComputedStyle(node).getPropertyValue("width").replace('px', '');
		const height = window.getComputedStyle(node).getPropertyValue("height").replace('px', '');

		const newProducts = products.map(item => {
			return {
				productId: item.productId,
				imageURL: item.imageURL,
				width: ((Math.round((item.width * 100) / width) * 100) / 100 )+ "%",
				height: ((Math.round((item.height * 100) / height) * 100) / 100 )+ "%",
				top: ((Math.round((item.top * 100) / height) * 100) / 100 )+ "%",
				left: ((Math.round((item.left * 100) / width) * 100) / 100 )+ "%",

			}
		});

		localStorage.changingRoom = JSON.stringify({
			products: newProducts,
			width,
			height
		});

		dispatch({
			type: ChangingRoomActions.SAVE_CHANGING_ROOM,
			payload: {
				products: newProducts,
				width,
				height
			}
		});


		// domtoimage.toSvg(node)
		// 	.then(dataUrl => {
		// 		dispatch({
		// 			type: ChangingRoomActions.SAVE_CHANGING_ROOM,
		// 			payload: {
		// 				products: newProducts,
		// 				picture:dataUrl,
		// 				width,
		// 				height
		// 			}
		// 		});
		// 	})


	}
}

export function moveProduct(product, left, top) {
	return function(dispatch) {
		dispatch({
			type: ChangingRoomActions.MOVE_PRODUCT,
			payload: {
				product,
				left,
				top,
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