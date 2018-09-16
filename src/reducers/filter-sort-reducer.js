const filterSortReducerDefaults = {
  categories: [],
  filterByStock: 'none',
  sortByPrice: 'ascend'
}
export default (state = filterSortReducerDefaults, action) => {
  switch (action.type) {
    case 'ADD_TO_CATEGORY_FILTER':
      const oldCategories = state.categories
      return {
        ...state,
        categories: [...oldCategories, action.category]
      }

    case 'REMOVE_FROM_CATEGORY_FILTER':
      const categories = state.categories
      var indexOfItem = state.categories.indexOf(action.category)
      categories.splice(indexOfItem, 1)
      return {
        ...state,
        categories: categories
      }

    case 'FILTER_BY_STOCK':
      return {
        ...state,
        filterByStock: action.choice
      }
    case 'SORT_BY_PRICE':
      return {
        ...state,
        sortByPrice: action.choice
      }

    default:
      return state
  }
}
