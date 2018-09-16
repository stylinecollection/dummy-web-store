// add category to the filterByCategory array
export const addToCategoryFilter = (category) => ({
  type: 'ADD_TO_CATEGORY_FILTER',
  category: category
})

// remove category from the 'filter by category' array
export const removeFromCategoryFilter = (category) => ({
  type: 'REMOVE_FROM_CATEGORY_FILTER',
  category: category
})

// filter by choices
export const filterByStock = (choice) => ({
  type: 'FILTER_BY_STOCK',
  choice: choice
})

// activate or deactivate sort by price
export const sortByPrice = (choice) => ({
  type: 'SORT_BY_PRICE',
  choice: choice
})
