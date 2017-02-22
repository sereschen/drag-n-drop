import React from "react";
import styles from "./Categories.scss";
import classNames from "classnames";
import Category from "../Category/Category";


export default class Categories extends React.Component {	
	render(){

		const {categories} = this.props;
		const mappedCategories = categories.map(category => <Category key={category.productCategoryId} category={category}></Category>);
		return (
			<div class={classNames(styles.categories, this.props.bootstrapClasses)}>{mappedCategories}</div>
		)
	}
}