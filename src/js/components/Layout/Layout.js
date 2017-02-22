import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions/productsActions";
import Categories from "../Categories/Categories";
import ChangingRoom from "../ChangingRoom/ChangingRoom";
import { DragDropContext } from 'react-dnd';
import {addProductToChangingRoom} from "../../actions/ChangingRoomActions";
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

  render() {
    const { products , changingRoomProducts } = this.props;

    return (
      <div class={'container'}>
      <ChangingRoom products={changingRoomProducts} addProduct={product=>this.addProduct(product)} bootstrapClasses={'col-sm-6'}></ChangingRoom>
      <Categories bootstrapClasses={'col-sm-6'} categories={products} />
      </div>
      
      )
  }
}
