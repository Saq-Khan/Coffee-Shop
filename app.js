const swipeableList = document.querySelector('.coffee-list');

let isDown = false;
let startX;
let scrollLeft;

const startDrag = (e) => {
    isDown = true;
    startX = (e.pageX || e.touches[0].pageX) - swipeableList.offsetLeft;
    scrollLeft = swipeableList.scrollLeft;
    swipeableList.style.cursor = 'grabbing';
};

const endDrag = () => {
    isDown = false;
    swipeableList.style.cursor = 'grab';
};

const moveDrag = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = (e.pageX || e.touches[0].pageX) - swipeableList.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    swipeableList.scrollLeft = scrollLeft - walk;
};

// Mouse events
swipeableList.addEventListener('mousedown', startDrag);
swipeableList.addEventListener('mouseleave', endDrag);
swipeableList.addEventListener('mouseup', endDrag);
swipeableList.addEventListener('mousemove', moveDrag);

// Touch events
swipeableList.addEventListener('touchstart', startDrag);
swipeableList.addEventListener('touchend', endDrag);
swipeableList.addEventListener('touchmove', moveDrag);

// THIS FUNCTION DYNAMICALLY UPDATES TOTAL PRICES OF EACH PRODUCT UPON QTY CHANGE
$(document).ready(function() {
    // Function to calculate the total price for each row
    function updateTotalPrice() {
      // Get all elements with the class 'qty'
      var qtyElements = document.querySelectorAll('.qty');
      var amountElements = document.querySelectorAll('.amount');
      var orderAmtElements = document.querySelectorAll('.order-value');
  
      // Iterate through all rows
      qtyElements.forEach(function(qtyElement, index) {
        // Get the value and amount for the current row
        var qty = parseFloat(qtyElement.value) || 1;
        var amount = parseFloat(amountElements[index].textContent) || 0; // Default to 0 if amount is not a number
  
        // Calculate the total and set it for the corresponding order amount element
        var total = (qty * amount).toFixed(2);
        orderAmtElements[index].value = '$ ' + total;
      });
    }
  
    // Attach the change event listener to all quantity inputs
    $(document).on('change', '.qty', updateTotalPrice);
  });



  $(document).ready(function() {
    var addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    var productNameElements = document.querySelectorAll('.productName');
    var cartQtyElements = document.querySelectorAll('.qty');
    var cartOrderAmtElements = document.querySelectorAll('.order-value');
    var cartAlert = document.querySelector('.cart-alert');


    addToCartBtns.forEach(function(addToCartBtn, cartIndex){

        addToCartBtn.addEventListener('click', (event) => {
            event.preventDefault();
        cartAlert.classList.add('active');
        setTimeout(function() {
            cartAlert.classList.remove('active');
          }, 1800);
        var cartQty = parseFloat(cartQtyElements[cartIndex].value) || 1;
        var productName =(productNameElements[cartIndex].textContent);
        var cartOrderAmtText = cartOrderAmtElements[cartIndex].value;
      var cartOrderAmt = parseFloat(cartOrderAmtText.replace(/[^0-9.-]+/g,"")) || 0; // Default to 0 if not a number
        // var cartOrderAmt = parseFloat(cartOrderAmtElements[cartIndex].value);
        
        
        var newOrder = new Object();
        newOrder.name = productName
        newOrder.quantity = cartQty
        newOrder.amount = cartOrderAmt

        var cartItems = JSON.parse(localStorage.getItem("CartItems")) || [];

        cartItems.push(newOrder);

        localStorage.setItem("CartItems", JSON.stringify(cartItems))

        // cartItems.forEach(function(order, OrderIndex){
  displayCartItems();
            
        // })
    })
})
});


// EMPTY CART
//   var emptyCart = document.getElementById('empty-cart');
//     var cartEmptyFunction = emptyCart.addEventListener('click', () => {
//         var confirmEmpty = confirm('Are you sure you want to empty the cart?')
//         if(confirmEmpty){
//         localStorage.removeItem("CartItems");
//         // document.getElementById('cart-items').innerHTML = 'no items';
//       }

//   displayCartItems();

//   })

// //   DISPLAYONG ITEMS IN CART
// function displayCartItems() {
//     // Get the cart items from localStorage
//     var cartItems = JSON.parse(localStorage.getItem("CartItems")) || [];

//     // Get the container element
//     var container = document.getElementById('cart-items');
    
//     // Clear the container first (if needed)
//     container.innerHTML = '';
//     var totalAmountElement =  document.getElementById('total-amount')
//     var totalAmount = 0;
//     if (cartItems === null || cartItems.length === 0) {
//         container.innerHTML = '<img style="opacity: 0.5; margin-top: 100px;" src="https://foreverliving.gr/static/img/cartEmpty.png" alt="">';
//         totalAmountElement.style.display = 'none';

//     }
//     else{
//     // Iterate over the cart items and create HTML for each item
//     cartItems.forEach(function(item) {
//       var itemHtml = `
//       <div class="cart-item d-flex justify-content-between px-2">
//       <span>${item.quantity}&nbsp;&nbsp;${item.name}</span>
//       <span>${item.amount.toFixed(2)}</span></div><hr>`; 
//       // Append the item HTML to the container
//       container.insertAdjacentHTML('beforeend', itemHtml);
//       totalAmount += item.amount;
//     });
//     totalAmountElement.innerHTML = `<span>Total:</span><span class="float-end"> ${totalAmount.toFixed(2)}</span>`;
//     totalAmountElement.style.display = 'block';

//     var orderCard = document.getElementById('order-card');

//     var orderCardValue = container.innerHTML;
//     var orderCardAmount = totalAmountElement.innerHTML;
      
//     var orderCardIsEmpty = '<h2 class=" text-center">Cart</h2><br><br> <h2 class="text-center">Nothing in cart</h2>';
//     var orderCardIsFull =  `<h2 class=" text-center">Cart</h2><button class="float-end btn-close" id="close-order-card"></button><br><br> ${orderCardValue} <br> ${orderCardAmount}`
//       if(orderCardValue == '' || orderCardValue == '<img style="opacity: 0.5; margin-top: 100px;" src="https://foreverliving.gr/static/img/cartEmpty.png" alt="">' ){
//         orderCard.innerHTML = '';
//         orderCard.insertAdjacentHTML('beforeend', orderCardIsEmpty);
//       }
//       else{
//         orderCard.innerHTML = '';
//         orderCard.insertAdjacentHTML('beforeend', orderCardIsFull);
//       }
//     document.getElementById('place-order').addEventListener('click', () => {
//       orderCard.style.display = 'block';
      
//     })
//   }};


//   // Call the function to display the cart items when the page loads
//   displayCartItems();
//   function closeOrderCard(){
//     document.getElementById('close-order-card').addEventListener('click', () => {
//       document.getElementById('order-card').style.display = 'none';
//     })
//   }

//   closeOrderCard();

//i hate my life
let inLocation = document.getElementById('locate').value;

function updateLocation() {
    var locateInput = document.getElementById('locate');
    locateInput.addEventListener('change', () => {
    inLocation = locateInput.value;
    displayCartItems();
    });
}

// EMPTY CART
var emptyCart = document.getElementById('empty-cart');
emptyCart.addEventListener('click', () => {
    var confirmEmpty = confirm('Are you sure you want to empty the cart?');
    if (confirmEmpty) {
        localStorage.removeItem("CartItems");
        displayCartItems();
    }
});

// DISPLAYING ITEMS IN CART
function displayCartItems() {
    // Get the cart items from localStorage
    var cartItems = JSON.parse(localStorage.getItem("CartItems")) || [];

    // Get the container element
    var container = document.getElementById('cart-items');
    var totalAmountElement = document.getElementById('total-amount');
    var orderCard = document.getElementById('order-card');
    var totalAmount = 0;

    // Clear the container first
    container.innerHTML = '';
    orderCard.innerHTML = '';

    if (cartItems.length === 0) {
        container.innerHTML = '<img style="opacity: 0.5; margin-top: 100px;" src="https://foreverliving.gr/static/img/cartEmpty.png" alt="Cart is empty">';
        totalAmountElement.style.display = 'none';
        orderCard.innerHTML = '<h2 class="text-center">Order Card</h2><button class="float-end btn-close" id="close-order-card"></button><br><br><h4 class="text-center">Nothing in cart</h4>';
    } else {
        // Iterate over the cart items and create HTML for each item
        cartItems.forEach(function(item) {
            var itemHtml = `
            <div class="cart-item d-flex justify-content-between px-2">
            <span>${item.quantity}&nbsp;&nbsp;${item.name}</span>
            <span>${item.amount.toFixed(2)}</span></div><hr>`;
            container.insertAdjacentHTML('beforeend', itemHtml);
            totalAmount += item.amount;
        });

        // Display the total amount
        totalAmountElement.innerHTML = `<span>Total:</span><span class="float-end">$${totalAmount.toFixed(2)}</span>`;
        totalAmountElement.style.display = 'block';

        // Update the order card
        var orderCardValue = container.innerHTML;
        var orderCardAmount = totalAmountElement.innerHTML;

        
        var orderCardIsFull = `
            <h2 class="text-center">Order Card</h2>
            <button class="float-end btn-close" id="close-order-card"></button>
            <br><br>
            <h6 class="d-inline">Location:</h6>
            <span>${inLocation}</span><br><br>
            <div class="order-items">${orderCardValue}</div><br>${orderCardAmount}<br>
            <button id="confirmOrder">Place Order</button>`;

        orderCard.innerHTML = orderCardIsFull;

        // Re-add the event listener to the close button
        closeOrderCard();
    }

    // Add click event listener to 'place-order' button if not already added
    var placeOrderButton = document.getElementById('place-order');
    if (!placeOrderButton.hasAttribute('data-event-added')) {
        placeOrderButton.addEventListener('click', () => {
            orderCard.style.display = 'block';
          });
          placeOrderButton.setAttribute('data-event-added', 'true');
        }

            // SWEET ALERT ON ORDER CONFIRMATION
    let orderConfirm = document.getElementById('confirmOrder')

    if(orderConfirm)
    {orderConfirm.addEventListener('click', function(){
        orderCard.style.display = 'none';
        localStorage.removeItem("CartItems");
        displayCartItems();
        Swal.fire({
    position: "center",
    icon: "success",
    title: "Your order has been placed!",
    showConfirmButton: false,
    timer: 2500
    })
    })}
        closeOrderCard();
}

// Function to close the order card
function closeOrderCard() {
    var closeBtn = document.getElementById('close-order-card');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.getElementById('order-card').style.display = 'none';
        });
    }
}


let searchFeild = document.getElementById('search-feild');
let searchBtn = document.getElementById('search-btn');

searchFeild.addEventListener('input', ()=>{

    document.querySelector('.coffee-list-container').innerHTML = null

    if(searchFeild.value == ''){
        document.querySelectorAll('.coffee').forEach((coffee)=>{
         coffee.style.display = 'block'
     })
     }

    else if(new RegExp('[m]', 'i').test(searchFeild.value)){
        document.querySelectorAll('.coffee').forEach((coffee)=>{
         coffee.style.display = 'none'
     })
     document.querySelector('.machiato').style.display= 'block'
     document.querySelector('.mocha').style.display= 'block'
     }

     else if(new RegExp('[id]', 'i').test(searchFeild.value)){
        document.querySelectorAll('.coffee').forEach((coffee)=>{
         coffee.style.display = 'none'
     })
     document.querySelector('.iced-coffee').style.display= 'block'
     }
     else if(new RegExp('[e]', 'i').test(searchFeild.value)){
        document.querySelectorAll('.coffee').forEach((coffee)=>{
         coffee.style.display = 'none'
     })
     document.querySelector('.espresso').style.display= 'block'
     }
     else if(new RegExp('[c]', 'i').test(searchFeild.value)){
        document.querySelectorAll('.coffee').forEach((coffee)=>{
         coffee.style.display = 'none'
     })
     document.querySelector('.iced-coffee').style.display= 'block'
     document.querySelector('.cold-brew').style.display= 'block'
     document.querySelector('.cappucino').style.display= 'block'
     }
     else if(new RegExp('[f]', 'i').test(searchFeild.value)){
        document.querySelectorAll('.coffee').forEach((coffee)=>{
         coffee.style.display = 'none'
     })
     document.querySelector('.frappe').style.display= 'block'
     document.querySelector('.fredo').style.display= 'block'
     }
     else if(new RegExp('[latte]', 'i').test(searchFeild.value)){
        document.querySelectorAll('.coffee').forEach((coffee)=>{
         coffee.style.display = 'none'
     })
     document.querySelector('.latte').style.display= 'block'
     }
     else if(new RegExp('[ho]', 'i').test(searchFeild.value)){
        document.querySelectorAll('.coffee').forEach((coffee)=>{
         coffee.style.display = 'none'
     })
     document.querySelector('.hot-chocolate').style.display= 'block'
     }
})


// Call the function to display the cart items when the page loads
displayCartItems();
closeOrderCard();
updateLocation();