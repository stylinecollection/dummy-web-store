import equals from 'array-equal'
import config from '../config'

const filterAndSortSelector = (products, { categories, filterByStock, sortByPrice }) => {
  return products.filter((product) => {
    // setting up filter by stock
    const filteredByStock = filterByStock === 'none' ? true : filterByStock === product.meta.stock.availability
    // filter by categories
    var filteredByCategory = true
    if (categories.length > 0) {
      if (product.relationships.categories) {
        const productCategoryList = product.relationships.categories.data.map((data) => {
          return data.id
        })
        filteredByCategory = equals(categories, productCategoryList)
      } else {
        filteredByCategory = false
      }
    }
    return filteredByStock && filteredByCategory
  }).sort((a, b) => {
    const aPrice = a.price[0].currency === 'USD' ? a.price[0].amount * config.usdToGBP : a.price[0].amount
    const bPrice = b.price[0].currency === 'USD' ? b.price[0].amount * config.usdToGBP : b.price[0].amount
    if (sortByPrice === 'ascend') {
      return aPrice - bPrice
    } else {
      return bPrice - aPrice
    }
  })
}
export default filterAndSortSelector
