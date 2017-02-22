import React from "react";
import styles from "./Product.scss";
import classNames from "classnames";
import ProductImage from "../ProductImage/ProductImage";

export default class Product extends React.Component {
	

	
	render(){
		const {product} = this.props;
		return (
			<div class={classNames(styles.product, this.props.bootstrapClasses)}>
			<span>{product.name}</span>
			<ProductImage product={product}></ProductImage>
			</div>
			)
	}
}