import React from "react";
import classNames from "classnames";
import styles  from "./DragableProduct.scss";
import { DragSource } from 'react-dnd';
import DnDTypes from "../../constants/DnDTypes";
import ProductImage from "../ProductImage/ProductImage";

const productSource = {
	beginDrag(props) {
		return {
			product: props.product,
		};
	},
};

@DragSource(DnDTypes.ListProduct, productSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
export default class DragableProduct extends React.Component {
	
	render() {
		const {product, isDragging, connectDragSource} = this.props;
		const opacity = isDragging ? 0.4 : 1;
		return connectDragSource(
				<div style={{opacity : opacity}}>
					<ProductImage product={product}></ProductImage>
				</div>
			);
	}
}
