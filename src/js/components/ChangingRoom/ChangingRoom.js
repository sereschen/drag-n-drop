import React from "react";
import classNames from "classnames";
import styles from "./ChangingRoom.scss";
import ChangingProduct from "../ChangingProduct/ChangingProduct";
import { DropTarget } from 'react-dnd';
import DnDTypes from "../../constants/DnDTypes";
import {connect} from "react-redux";
import _ from "lodash";


const changingRoomTarget = {
	drop(props, monitor) {
		const type = monitor.getItemType();
		const {
			product
		} = monitor.getItem();

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
		}else{
			return true;
		}
	}
};

@DropTarget([DnDTypes.ListProduct, DnDTypes.ChangingRoomProduct], changingRoomTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
}))

export default class ChangingRoom extends React.Component {

	render(){
		const {products , connectDropTarget} = this.props;
		const renderedProducs = products.map(product=><ChangingProduct key={product.productId} product={product}></ChangingProduct>);
		return connectDropTarget(
			<div class={classNames(styles['changing-room'], this.props.bootstrapClasses)}>
			{renderedProducs}
			</div>
			)
	}
}