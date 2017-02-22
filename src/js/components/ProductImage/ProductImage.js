import React from "react";
import classNames from "classnames";
import styles  from "./ProductImage.scss";
import { DragSource } from 'react-dnd';
import DnDTypes from "../../constants/DnDTypes";

const productSource = {
	beginDrag(props) {
		console.log(props);
		return {
			product: props.product,
		};
	},
};

@DragSource(DnDTypes.Product, productSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
export default class ProductImage extends React.Component {
	
	render() {
		const {product, isDragging, connectDragSource} = this.props;
		const opacity = isDragging ? 0.4 : 1;
		return connectDragSource(
			<div style={{ opacity , cursor: 'move',}} class={classNames(styles.productImage)}>
			<img src={'images/' + product.imageURL}/>
			</div>
			);
	}
}
