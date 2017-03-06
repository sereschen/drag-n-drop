import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions/productsActions";
import Categories from "../Categories/Categories";
import ChangingRoom from "../ChangingRoom/ChangingRoom";
import Preview from "../Preview/Preview";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from "lodash";
import styles from "./Layout.scss";
import classNames from "classnames";

@connect((store) => {
  return {
    products: store.products.products,
  };
})

@DragDropContext(HTML5Backend)
export default class Layout extends React.Component {


  componentWillMount() {
    this.props.dispatch(fetchProducts());
  }

  render() {
    const { products  } = this.props;

    return (
        <div>
          <div class={classNames(styles.whiteBackground,'container')}>
            <div class={classNames('row')}>
              <div class={classNames('col-xs-2', styles.logoContainer)}>
              <img src="../../../images/cliologo.gif" alt="cliologo"/>
              </div>
            </div>
            <ChangingRoom bootstrapClasses={'col-sm-6'}></ChangingRoom>
            <Categories bootstrapClasses={'col-sm-6'} categories={products} />
          </div>
        </div>
      )
  }

}
