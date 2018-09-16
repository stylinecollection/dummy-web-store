import Moltin from '../Moltin/moltin-config'

const fetchInit = () => {
  return (dispatch) => {
    Moltin.Products.All().then((res) => {
      dispatch({ type: 'ADD_PRODUCTS_LIST', products: res.data })
    }).catch(err => console.log(err))
  }
}
// redux thunk
export default (store) => {
  store.dispatch(fetchInit())
}
