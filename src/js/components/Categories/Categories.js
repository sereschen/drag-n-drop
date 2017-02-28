import React from "react";
import styles from "./Categories.scss";
import classNames from "classnames";
import Category from "../Category/Category";


export default class Categories extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            selectedCategoryId: "S29_ACCESSORIES",
            searchInputText: ''
        };

	}

    handleSelectChange(event) {
        this.setState({selectedCategoryId: event.target.value, searchInputText: ''});
    }

    handleTextChange(event) {
	    this.setState({searchInputText: event.target.value})
    }

    findSelectedCategory = () => {
	    if (this.state.searchInputText != '' && this.state.searchInputText.length > 2) {
            let products = [];

            this.props.categories.forEach(function (category) {
                category.products.forEach(function (product) {
                    if (product.productId.includes(this.state.searchInputText)
                    || product.name.toLowerCase().includes(this.state.searchInputText)) {
                        products.push(product)
                    }
                }.bind(this));
            }.bind(this));

            let productsObject = {products: products};
            return <Category key={this.state.searchInputText} category={productsObject}></Category>

        } else if (this.state.selectedCategoryId && this.props.categories.length > 0) {
            let categoryToShow = [];

            this.props.categories.forEach(function (category) {
                if (category.productCategoryId == this.state.selectedCategoryId) {
                    categoryToShow.push(category);
                }
            }.bind(this));

           return <Category key={categoryToShow[0].productCategoryId} category={categoryToShow[0]}></Category>
        }
	};

	renderOptions() {
		return this.props.categories.map(category =>
			<option key={category.productCategoryId} value={category.productCategoryId}>{category.categoryName}</option>
        );
	}

	render(){

		return (
            <div class={classNames(styles.categories)}>
                <div class={classNames(styles.selectContainer)}>
                    <select name="seasonSelect" id="seasonSelect" defaultValue={"S29"}>
                        <option value="S29">Spring '17</option>
                    </select>
                    <select name="categorySelect" value={this.state.selectedCategoryId} id="categorySelect" onChange={this.handleSelectChange.bind(this)}>
                        {this.renderOptions()}
                    </select>
                    <input type="text" placeholder="Product ID / Keyword" value={this.state.searchInputText} onChange={this.handleTextChange.bind(this)}/>
                </div>
                <div>
                    {this.findSelectedCategory()}
                </div>
            </div>
		)
	}
}