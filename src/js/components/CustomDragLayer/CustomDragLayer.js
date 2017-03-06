import React, { Component, PropTypes } from 'react';
import { DragLayer } from 'react-dnd';
import DnDTypes from "../../constants/DnDTypes";
import ChangingProduct from "../ChangingProduct/ChangingProduct";

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

@DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialClientOffset(),
  currentOffset: monitor.getDifferenceFromInitialOffset(),
  isDragging: monitor.isDragging(),
}))

export default class CustomDragLayer extends Component {

  renderItem(type, item) {
    const { product } = item;
    switch (type) {
      case DnDTypes.ChangingRoomProduct:
        return (<ChangingProduct product={product} />);
      default:
        return null;
    } 
  }

  render() {
    const {
      item,
      itemType,
      isDragging
    } = this.props;

    const layerStyles = {
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 100,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
    };

    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
            {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
}