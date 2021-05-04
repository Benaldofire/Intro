//check to make sure document is loaded before accessing any part of it.
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
    //DOMContentLoaded event is caused when HTML file has been loaded and parsed
}
else{
    ready();
}

//to initialize required data after the content is done loading.
function ready(){
    let removeCartItemButtons = document.getElementsByClassName("btn-danger"); //returns array
    //console.log(removeCartItemButtons);

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

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    
}
//removes everything from cart once purchase is clicked, iterates through all the cart items
function purchaseClicked(){
    alert('Thank you for your purchase')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}


//remove an item from the cart, then update the total
function removeCartItem(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal()
}

//Update the total once the value inside the quantity input has been changed
function quantityChanged(event){
    let input = event.target;
    //restrict input to number and ensure its greater than 1.
    if(isNaN(input.value) || input.value <= 0){//isNan Checks if input is a number or not
        input.value = 1;
    }
    updateCartTotal()
}

function addToCartClicked(event){
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('item-name')[0].innerText
    let price =shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let imgSrc = shopItem.getElementsByClassName('shop-item-img')[0].src
    //console.log(title, price, imgSrc)
    addItemToCart(title, price, imgSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imgSrc){
    let cartRow = document.createElement('div')
    //add class cart-row to the new div so that the css applies to the new row
    cartRow.classList.add('cart-row')
    //returns an araay of elements with classname 'cart-items' but since there is only 1 then it's in position 1.
    let cartItems = document.getElementsByClassName('cart-items')[0]
    //check if item exists before adding to cart, get list of existing items
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for(let i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('This item is already added to the cart')
            return
        }
    }

    //use ` ` to allow text to go onto another row
    //need to update the image src and the title and price. back ticks `` allow us to use ${title}

    let cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src = "${imgSrc}">
        <span class="cart-item-title"> ${title} </span>
    </div>

    <span class="cart-price cart-column"> ${price} </span>

    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type = "number" value="1" min="1">
        <button class="btn btn-danger cart-quantity-button" type = " button"> REMOVE </button>
    </div>
    `
    
    //now set the cartRow inner content to the contents. placing the div inside the other
    cartRow.innerHTML = cartRowContents; 
    cartItems.append(cartRow)
    //add eventlistener to new div
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem )
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged )

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
    //round to 2 decimal places 
    total = Math.round(total * 100)/100
    document.getElementsByClassName('cart-total-price')[0].innerHTML = '$' + total;
}
updateCartTotal();