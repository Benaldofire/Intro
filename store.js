//window.addEventListener("DOMContentLoaded", loadedHandler); in this case ready


if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
    //DOMContentLoaded event is caused when HTML file has been loaded and parsed
}
else{
    ready();
}

function ready(){
    let removeCartItemButtons = document.getElementsByClassName("btn-danger"); //returns array
    console.log(removeCartItemButtons);

    for(let i = 0; i< removeCartItemButtons.length; i++){
        let button = removeCartItemButtons[i];
        button.addEventListener('click',removeCartItem )
    }

    let quantityInput = document.getElementsByClassName('cart-quantity-input');
    for(let i = 0; i< quantityInput.length; i++){
        let input = quantityInput[i];
        input.addEventListener('change', quantityChanged);
    }

    let addToCartButtons = document.getElementsByClassName('shop-item-button')
    for(let i = 0; i< addToCartButtons.length; i++){
        let button = addToCartButtons[i];
        button.addEventListener('click',addToCartClicked )
    }
}

function removeCartItem(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal()
}

function quantityChanged(event){
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal()
}

function addToCartClicked(event){
    let button = event.target;
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('item-name')[0].innerText
    let price =shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let imgSrc = shopItem.getElementsByClassName('shop-item-img')[0].src
    console.log(title, price, imgSrc)
    addItemToCart(title, price, imgSrc)
}
function addItemToCart(title, price, imgSrc){
    let cartRow = document.createElement('div')
    cartRow.innerText = '';
    let cartRowContents = '';
    let cartItems = document.getElementsByClassName('cart-items')[0]
    cartItems.append(cartRow)


}


function updateCartTotal(){
    //go through cart and find price and multiple by quantity and add it to display total
    // we the first and only element in the array
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]; 
    //get elements within cart row
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');  
    let total = 0;
    for(let i = 0; i < cartRows.length; i++){
        let cartRow = cartRows[i];
        // we the first and only price element in the array
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        //console.log(priceElement,quantityElement);
        //to get actual information
        //need to replace dollar sign with nothing and parse value to float
        let price = parseFloat(priceElement.innerText.replace('$','')); 
        let quantity = quantityElement.value;
        // as opposed to innerHTML, the text returns actual text not html element

        //update the total
        total = total + (price*quantity);
    }
    total = Math.round(total * 100)/100
    document.getElementsByClassName('cart-total-price')[0].innerHTML = '$' + total;
}
updateCartTotal();