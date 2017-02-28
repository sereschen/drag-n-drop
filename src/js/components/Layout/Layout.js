import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions/productsActions";
import Categories from "../Categories/Categories";
import ChangingRoom from "../ChangingRoom/ChangingRoom";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from "lodash";

@connect((store) => {
  return {
    products: store.products.products,
  };
})

@DragDropContext(HTML5Backend)
export default class Layout extends React.Component {


  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  render() {
    const { products  } = this.props;

    return (
      <div class={'container'}>
      <ChangingRoom bootstrapClasses={'col-sm-6'}></ChangingRoom>
      <Categories bootstrapClasses={'col-sm-6'} categories={products} />
      </div>
      
      )
  }
}
