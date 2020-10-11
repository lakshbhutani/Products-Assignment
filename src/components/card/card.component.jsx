import React from 'react';

import './card.styles.css';

export const Card = props => {
  
  let produtSizeList = []
  props.product.sizeVariation.forEach( item =>  produtSizeList.push(item.title))
  let value = produtSizeList.toString()

  return(
    <div className='card-container'>
      <img
        alt='product'
        src={props.product.imageUrl}
        style={{ width: 180, height: 180 }}
      />
      <h2> {props.product.title} </h2>
      <p> {props.product.subTitle} </p>
      <p style={{ width: 180, wordWrap: 'break-word'}} >{value}</p>
    </div>
  )
};
