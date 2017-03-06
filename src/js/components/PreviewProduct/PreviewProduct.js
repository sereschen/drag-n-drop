import React from "react";


export default class PreviewProduct extends React.Component {

	render(){
		const {product} = this.props;
		const styles = {
			left: product.left,
			top: product.top,
			width : product.width,
			position: "absolute"
		}

		const imageStyles={
			objectFit : 'cover',
			objectPosition : '50% 50%',
			width : '100%',
			height : '100%'
		}

		return (
			<div style={styles}>
				<img style={imageStyles} src={'images/'+product.imageURL} alt={product.productId}/>
			</div>
		)
	}
}