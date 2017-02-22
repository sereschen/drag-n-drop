import React from "react";
import styles from "./Category.scss";
import classNames from "classnames";
import Product from "../Product/Product";


export default class Category extends React.Component {	
	render(){
		const {category} = this.props;
		const products = category.products.map(product=> <Product bootstrapClasses={'col-sm-4'} key={product.productId} product={product}></Product> );
		return (
		<div class={classNames(styles.category , 'row')}>
			<div class={classNames(styles.title)}>{category.categoryName}</div>
			{products}
		</div>
		)
	}
}