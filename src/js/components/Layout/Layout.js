import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions/productsActions";
import Categories from "../Categories/Categories";
import ChangingRoom from "../ChangingRoom/ChangingRoom";
import { DragDropContext } from 'react-dnd';
import {addProductToChangingRoom , moveProduct} from "../../actions/ChangingRoomActions";
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import _ from "lodash";

@connect((store) => {
  return {
    products: store.products.products,
    changingRoomProducts : store.changingRoom.changingRoomProducts
  };
})

@DragDropContext(HTML5Backend)
export default class Layout extends React.Component {


  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  addProduct(product){
    this.props.dispatch(addProductToChangingRoom(product));
  }

  moveProduct(product, left, top) {
    this.props.dispatch(moveProduct(product, left, top));
  }


  render() {
    const { products , changingRoomProducts } = this.props;

    return (
      <div class={'container'}>
      <ChangingRoom products={changingRoomProducts} addProduct={product=>this.addProduct(product)} moveProduct={(product, left, top)=>this.moveProduct(product, left , top)} bootstrapClasses={'col-sm-6'}></ChangingRoom>
      <Categories bootstrapClasses={'col-sm-6'} categories={products} />
      </div>
      
      )
  }
}
