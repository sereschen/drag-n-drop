import React from "react";
import styles from "./Product.scss";
import classNames from "classnames";
import DragableProduct from "../DragableProduct/DragableProduct";

export default class Product extends React.Component {
	

	
	render(){
		const {product} = this.props;
		return (
			<div class={classNames(styles.product, this.props.bootstrapClasses)}>
				<DragableProduct product={product}></DragableProduct>
				<div class={classNames(styles.title)}>
					{product.name} <br/> {product.productId.substring(2)}
				</div>
			</div>
			)
	}
}