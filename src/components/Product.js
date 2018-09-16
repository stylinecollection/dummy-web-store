import React from 'react'
import truncate from 'truncate'
import config from '../config'

const Product = (props) => {
  if (props.relationships.categories) {
    var categories = props.relationships.categories.data.map((category) => {
      if (category.id === 'a980f3af-e188-44e5-970c-bc9942ae4cac') return 'Electronics'
      if (category.id === 'db64ec3e-8b73-4407-b6a5-309da3338421') return 'Set-top boxes'
    }).join(',')
  } else {
    var categories = ''
  }
  return (
    <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12' >
      <div className='card' style={{ marginTop: '20px', marginRight: '20px' }}>
        <img className='card-img-top' src={config.imagePrefix + props.relationships.files.data[0].id + config.imageSuffix} alt='Card image cap' />
        <div className='card-body'>
          <div className='card-title'><strong>{truncate(props.name, 50)}</strong></div>
          <div>Category: { categories }</div>
          <div>SKU: {props.sku}</div>
          <div>Stock: {props.meta.stock.availability}</div>
          <div>Price: {props.price[0].amount + ' ' + props.price[0].currency}</div>
        </div>
      </div>
    </div>
  )
}

export default Product
