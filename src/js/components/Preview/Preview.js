import React from "react";
import { connect } from "react-redux";

import PreviewProduct from "../PreviewProduct/PreviewProduct";


@connect((store) => {
	return {
		preview: store.changingRoom.preview,
	};
})
export default class Preview extends React.Component {

	render(){

	const {preview , bootstrapClasses} = this.props;
	const {height, width , products} = preview;

	const styles={
		position:"relative",
		height,
		width
	}

	if(!height){
		return null;
	}
	return (
		<div class={bootstrapClasses} style={styles}>
			{products.map(product=><PreviewProduct product={product} key={product.productId}/>)}
		</div>
		)
	}

}