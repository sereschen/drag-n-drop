import React from "react";
import classNames from "classnames";
import styles  from "./ChangingProduct.scss";
import { DragSource } from 'react-dnd';
import DnDTypes from "../../constants/DnDTypes";
import ProductImage from "../ProductImage/ProductImage";
import Resizable from "react-resizable-box";

const productSource = {
	beginDrag(props) {
		const { product } = props;
		return { product };
	},
};

@DragSource(DnDTypes.ChangingRoomProduct, productSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	connectDragPreview: connect.dragPreview(),
	isDragging: monitor.isDragging(),
}))
export default class ChangingProduct extends React.Component {
	

	render() {
		const { product, isDragging, connectDragSource , connectDragPreview} = this.props;
		const style = {
			position: 'absolute',
			border: '1px dashed gray',
			cursor: 'move',
		};

		const styles = {
			width : '10px',
			height : '10px',
			borderRadius : '50%',
			background  : '#000',
			position : 'absolute'
		};

		const handlersStyles = {
			topRight: {...styles, top : '-7px', right: '-7px'},
			topLeft: {...styles, top : '-7px' , left : '-7px'},
			bottomRight: {...styles, bottom : '-7px', right : '-7px'},
			bottomLeft: {...styles, bottom : '-7px', left : '-7px'}
		}

		const handlers = {
			top: false,
			right: false,
			bottom: false,
			left: false,
			topRight: true,
			bottomRight: true,
			bottomLeft: true,
			topLeft: true
		};

		if (isDragging) {
			return null;
		}
		return connectDragSource(
			<div style={{...style, top : product.top , left : product.left}}>
			<Resizable width={300} lockAspectRatio={true} height={300} handleStyle={handlersStyles}  isResizable={handlers} customClass={classNames(styles['changing-product'])}>
			<ProductImage product={product}></ProductImage>
			</Resizable>
			</div>
			);
	}
}
