import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import styles from "./ChangingRoom.scss";
import ChangingProduct from "../ChangingProduct/ChangingProduct";
import { DropTarget } from 'react-dnd';
import DnDTypes from "../../constants/DnDTypes";
import { connect } from "react-redux";
import * as actions from "../../actions/ChangingRoomActions";
import _ from "lodash";
import { DragLayer } from 'react-dnd';
import CustomDragLayer from "../CustomDragLayer/CustomDragLayer";


const changingRoomTarget = {
	drop(props, monitor) {
		const type = monitor.getItemType();
		const {	product	} = monitor.getItem();
		switch (type) {
			case DnDTypes.ListProduct:
			props.addProduct(monitor.getItem());
			break;
			case DnDTypes.ChangingRoomProduct:
			const delta = monitor.getDifferenceFromInitialOffset();
			const leftReal = Math.round(product.left + delta.x);
			const topReal = Math.round(product.top + delta.y);
			props.moveProduct(product, leftReal, topReal);
			break;
			default:
			props.addProduct(monitor.getItem());
			break;
		}
	},
	canDrop(props, monitor) {
		const item = monitor.getItem();
		const type = monitor.getItemType();
		if (type === DnDTypes.ListProduct) {
			if (item) {
				const dragingProduct = item.product;
				const matches = _.filter(props.products, product => {
					return product.productId === dragingProduct.productId;
				});

				return !matches.length;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
};

const mapDispatchToProps = (dispatch) => {
	return ({
		addProduct: (product) => {			
			dispatch(actions.addProduct(product));
		},

		deleteProduct: (product) => {
			dispatch(actions.deleteProduct(product));
		},

		moveProduct: (product, left, top) => {
			dispatch(actions.moveProduct(product, left, top));
		},

		resizeProduct: (product, width, height) => {
			dispatch(actions.resizeProduct(product, width, height));
		},

		saveChangingRoom: (products) => {
			const node = document.getElementById('changing-room');
			dispatch(actions.saveChangingRoom(node, products));
		},

		loadChangingRoom : ()=>{
			const node = document.getElementById('changing-room');
			dispatch(actions.loadChangingRoom(node));
		}
	})
}


@connect((store) => {
	return {
		products: store.changingRoom.products,
	};
}, mapDispatchToProps)
@DropTarget([DnDTypes.ListProduct, DnDTypes.ChangingRoomProduct], changingRoomTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
}))


export default class ChangingRoom extends React.Component {
	componentDidMount(){
		this.props.loadChangingRoom();
	}

	render(){
		const {
			products,
			connectDropTarget,
			resizeProduct,
			bootstrapClasses,
			deleteProduct,
			saveChangingRoom,
		} = this.props;
		const renderedProducs = products.map(product=>{
			return (<ChangingProduct 
				resizeProduct={(product, width, height) => resizeProduct(product, width, height)} 
				deleteProduct={(product) => deleteProduct(product)} 
				key={product.productId} 
				product={product}
				></ChangingProduct>)
		});		
		return (
		<div class={classNames(styles['changing-room-container'], this.props.bootstrapClasses)}>
			<div class={classNames('row', styles.selectContainer)}>
				<select name="lookCategorySelect" id="lookCategorySelect" defaultValue={""}>
					<option value="">Select a Look Category</option>
				</select>
			</div>
			{connectDropTarget(
			<div id="changing-room" class={classNames(styles['changing-room'])}>
				{renderedProducs}
				<CustomDragLayer></CustomDragLayer>
			</div>
			)}
			<div>
				<button onClick={()=>saveChangingRoom(products)} class={classNames(styles['black-btn'])}>SAVE THIS LOOK</button>
			</div>			
		</div>


			)
	}

}