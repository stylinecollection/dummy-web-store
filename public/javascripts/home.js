(function () {
  var sort = '';
  var category = '';
  var stock = '';
  // var cartItems = [];

  function setQueryParams() {
    var urlParams = new URLSearchParams(location.search);
    sort = urlParams.has('sort') ? urlParams.get('sort') : '';
    category = urlParams.has('category') ? urlParams.get('category') : '';
    stock = urlParams.has('stock') ? urlParams.get('stock') : '';
  }

  function goTo() {
    var url = '/?';

    if (sort !== '') {
      url += '&sort=' + sort;
    }
    if (category !== '') {
      url += '&category=' + category;
    }
    if (stock !== '') {
      url += '&stock=' + stock;
    }

    window.location.href = url;
  }

  function handleSort(event) {
    event.stopPropagation();
    if (sort === '' || sort === '-price') {
      sort = 'price';
    } else {
      sort = '-price';
    }

    goTo();
  }

  function handleCategory(event) {
    event.stopPropagation();
    category = event.target.value;

    goTo();
  }

  function handleStock(event) {
    event.stopPropagation();
    stock = event.target.value;
    goTo();
  }

  function handleCart(event) {
    event.stopPropagation();
    var productId = event.target.getAttribute('data-product')
    // if (!cartItems.includes(productId)) {
    //   cartItems.push(productId);
    // }

    window.location.href = '/cart/add?product=' + productId + '&from=' + encodeURIComponent(location.search);
  }

  function initHome() {
    setQueryParams();
    // select sort
    var sortIcon = document.getElementById('sorticon');
    if (sortIcon) {
      sortIcon.addEventListener('click', handleSort);
    }
    var categorySelect = document.getElementById('categoryselect');
    if (categorySelect) {
      categorySelect.addEventListener('change', handleCategory);
    }

    var stockElements = document.getElementsByName('stock');
    if (stockElements) {
      stockElements.forEach(function (element) {
        element.addEventListener('click', handleStock);
      })
    }

    var cartElements = document.getElementsByClassName('fa-cart-plus');
    if (cartElements) {
      for (var i = 0, limit = cartElements.length; i < limit; i += 1) {
        cartElements[i].addEventListener('click', handleCart);
      }
    }

  }


  document.onreadystatechange = function () {
    if (document.readyState === 'interactive') {
      initHome();
    }
  };
}());
