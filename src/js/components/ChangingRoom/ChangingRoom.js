import React from "react";
import classNames from "classnames";
import styles from "./ChangingRoom.scss";
import ProductImage from "../ProductImage/ProductImage";
import { DropTarget } from 'react-dnd';
import DnDTypes from "../../constants/DnDTypes";
import {connect} from "react-redux";
import _ from "lodash";
const changingRoomTarget = {
	drop(props, monitor) {
		props.addProduct(monitor.getItem());
	},

	canDrop(props, monitor) {
		const item = monitor.getItem();
		if (item) {
			const dragingProduct = item.product

			const matches = _.filter(props.products, product=>{
				return product.product.productId === dragingProduct.productId;
			});
			
			return !matches.length;
		} else {
			return false;
		}
	}
};

@DropTarget(DnDTypes.Product, changingRoomTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))

export default class ChangingRoom extends React.Component {

	render(){
		const {products , connectDropTarget} = this.props;
		const renderedProducs = products.map(product=><ProductImage key={product.productId} product={product.product}></ProductImage>);
		return connectDropTarget(
			<div class={classNames(styles['changing-room'], this.props.bootstrapClasses)}>
			{renderedProducs}
			</div>
			)
	}
}