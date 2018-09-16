import React, { Component } from 'react'
import { connect } from 'react-redux'
import filterAndSortSelector from '../selectors/filter-and-sort-selector'
import Product from './Product'

class ProductGrid extends Component {
  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-12'>
            <h4>Products</h4>
          </div>
        </div>
        <div className='row'>
          { this.props.products.length > 0 ? this.props.products.map((product) => {
            return <Product key={product.id} {...product} />
          }) : <div className='col-md-12' style={{ textAlign: 'center' }}> ... </div> }
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    products: filterAndSortSelector(state.products, state.filters)
  }
}
export default connect(mapStateToProps, null)(ProductGrid)
