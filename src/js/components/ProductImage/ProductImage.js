import React from "react";
import classNames from "classnames";
import styles  from "./ProductImage.scss";

export default class ProductImage extends React.Component {
	
	render() {
		const {product} = this.props;
		return (
			<div class={classNames(styles.productImage)}>
				<img src={'images/' + product.imageURL}/>
			</div>
			);
	}
}
