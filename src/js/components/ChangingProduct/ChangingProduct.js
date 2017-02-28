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
		const { product, isDragging, connectDragSource , connectDragPreview , resizeProduct } = this.props;

		const handlerStyle = {
			width : '10px',
			height : '10px',
			borderRadius : '50%',
			background  : '#000',
			position : 'absolute'
		};

		const handlersStyles = {
			topRight: {...handlerStyle, top : '-7px', right: '-7px'},
			topLeft: {...handlerStyle, top : '-7px' , left : '-7px'},
			bottomRight: {...handlerStyle, bottom : '-7px', right : '-7px'},
			bottomLeft: {...handlerStyle, bottom : '-7px', left : '-7px'}
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

		const handlersClass = {
			top: classNames(styles.handler),
			right: classNames(styles.handler),
			bottom: classNames(styles.handler),
			left: classNames(styles.handler),
			topRight: classNames(styles.handler),
			bottomRight: classNames(styles.handler),
			bottomLeft: classNames(styles.handler),
			topLeft: classNames(styles.handler)
		};



		if (isDragging) {
			return null;
		}
		return (
			<div class={classNames(styles.changingProduct)} style={{ top : product.top , left : product.left}}>
				<Resizable onResizeStop={(direction, styleSize)=> resizeProduct(product, styleSize.width, styleSize.height)} 
						width={product.width} 
						height={product.height} 
						lockAspectRatio={true} 
						handleStyle={handlersStyles}
						isResizable={handlers}
						handleClass={handlersClass}>

						{connectDragSource(
							<div>
							<ProductImage product={product}></ProductImage>
							</div>
							)}
				</Resizable>
			</div>
			);
	}
}
