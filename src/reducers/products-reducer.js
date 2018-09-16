const productsReducerDefaultState = []
export default (state = productsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCTS_LIST':
      return action.products ? action.products : state
    default:
      return state
  }
}
