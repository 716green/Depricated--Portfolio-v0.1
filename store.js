// Verify that WebPage has loaded before executing any JavaScript */
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoader', ready)
} else {
    ready()
}

// // CREATING EVENT LISTNERS
// On page load, iniit a function to remove items from the cart
function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    // Init cart quatity functionality with event listners 
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    // Init 'add to cart' button functionality with event listeners
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    // Add event listener to cart purchase button
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

// Purchase Button
function purchaseClicked() {
    var cartItems = document.getElementsByClassName('cart-items')[0]
    if (cartItems.childElementCount > 0) {
        alert('Thank you for your purchase')
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }
    } else {
        alert('No services in cart')
    }
    updateCartTotal()
}


// Remove cart line item on click - Set earlier as event listener
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

// Recalculate balance on cart update 
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

// Add item to cart when clicked
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('service-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('service-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('service-item-image')[0].src
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

// Add function to add cart items
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div') // create div to add
    cartRow.classList.add('cart-row') // add class to new div
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item has already been added to your cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" height="48px" width="48px">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type ="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}

// Update and format cart total
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', '').replace('/mo', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    // Update 'total' amount
    total = (Math.round(total * 100) / 100).toFixed(2)
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}