import React, { Component } from 'react'
import { Provider } from 'react-redux'
import ProductGrid from './components/ProductGrid'
import fetchProductsList from './actions/fetch-products-list'
import configureStore from './store/configureStore'
import { filterByStock, addToCategoryFilter, removeFromCategoryFilter, sortByPrice } from './actions/filter-and-sort'
import AsyncActionGenerator from './actions/async-action-generator'
import Moltin from './Moltin/moltin-config'
const store = configureStore()

class App extends Component {

  state = {
    categories : []
  }

  componentDidMount () {
    fetchProductsList(store)
    Moltin.Categories.All().then((categories) => {
      this.setState({
        categories: categories.data
      })
    })
  }

  onStockSelectChange (e) {
    store.dispatch(AsyncActionGenerator(filterByStock, e.target.value))
  }

  onCategoryCheckChange (e) {
    if(e.target.checked){
      const categoryId = e.target.value
      store.dispatch(AsyncActionGenerator(addToCategoryFilter, categoryId))
    } else {
      const categoryId = e.target.value
      store.dispatch(AsyncActionGenerator(removeFromCategoryFilter, categoryId))
    }
  }

  onSortSelectChange (e) {
    store.dispatch(AsyncActionGenerator(sortByPrice, e.target.value ))
  }

  render () {
    return (
      <Provider store={store} >
        <div className='container'>
          <div className='row' style={{ marginTop: '20px' }}>
            <div className='col-md-12'>
              <div className="row">


                <div className='col-md-4 cl-sm-12'>
                  <p>Filter by stock</p>
                  <select onChange={this.onStockSelectChange}>
                    <option value='none'>All</option>
                    <option value='in-stock'>In-stock</option>
                    <option value='out-stock'>Out of stock</option>
                  </select>
                </div>
                <div className='col-md-4 cl-sm-12'>
                  <p>Filter by categories</p>
                  {this.state.categories.map((category) => {
                    return <div key={category.id}><input type='checkbox' onClick={this.onCategoryCheckChange} value={category.id} /> {category.name} </div>
                  })}
                </div>
                <div className='col-md-4 cl-sm-12'>
                  <p>Sort by price</p>
                  <select onChange={this.onSortSelectChange}>
                    <option value='ascend'>Ascending</option>
                    <option value='descend'>Descending</option>
                  </select>
                </div>

              </div>
            </div>

          </div>
          <ProductGrid />
        </div>
      </Provider>
    )
  }
}

export default App
