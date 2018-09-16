import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import filterSortReducer from '../reducers/filter-sort-reducer'
import productsReducer from '../reducers/products-reducer'

export default () => {
  const store = createStore(combineReducers({
    filters: filterSortReducer,
    products: productsReducer
  }),
  applyMiddleware(ReduxThunk)
  )
  return store
}
