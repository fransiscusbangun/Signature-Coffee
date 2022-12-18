
// darkmode
// let body = document.body;

// function darkMode() {
//     console.log('darkmmode di klik');
//     body.classList.toggle("dark");
// }

// narbar
function openNav() {
    document.getElementById("mysidenav").style.width = "250px";
};
function closeNav() {
    document.getElementById("mysidenav").style.width = "0";
}

// owl-carousel
$(document).ready(function () {
    $('.owl-one').owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        dots: true,
        responsive: {
            511: {
                items: 1
            },
            768: {
                items: 2
            },
            1000: {
                items: 4
            }
        },
    }),

        $('.owl-two').owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            dots: false,
            navText: ["<i class='fa-solid fa-arrow-left-long'></i>", "<i class ='fa-solid fa-arrow-right-long'></i>"],
            items: 1
        })
})


// cart-product online store

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};
// close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// cart working js 
if (document.readyState == 'loading') {
    document, addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// making funtion
function ready() {
    // menghapus items dari cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    // quantity change
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChange);
    }
    // add to cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // buy button work
    document
    .getElementsByClassName('btn-buy')[0] 
    .addEventListener('click', buyButtonClicked);
}
// buy button
function buyButtonClicked() {
alert('Your Order is place');
var cartContent = document.getElementsByClassName('cart-content')[0];
while (cartContent.hasChildNodes()) {
cartContent.removeChild(cartContent.firstChild);
}
updateTotal();
}
// remove cart
function removeCartItem(event) {
    var buttonCliked = event.target;
    buttonCliked.parentElement.remove();
    updateTotal();
}
// quantityChange
function quantityChange(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal()
}
// add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProduct = button.parentElement.parentElement;
    var title = shopProduct.getElementsByClassName('product-title')[0].innerText;
    var price = shopProduct.getElementsByClassName('price')[0].innerText;
    var productImg = shopProduct.getElementsByClassName('product-img')[0].src;
    console.log(title, price, productImg);
    addProductToCart(title, price, productImg);
    updateTotal();

}
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert('You have already add this item to cart');
        return;
}
    }
var cartBoxContent = ` 
<img src="${productImg}" alt="" class="cart-img">
 <div class="detail-box">
<div class="cart-product-title">${title}</div >
<div class="cart-price">${price}</div> 
<input type="number" value="1" class="cart-quantity">
</div>
<i class="bx bxs-trash-alt cart-remove"></i>`
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChange);
updateTotal();
}


function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = document.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("Rp", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
 }
        // jika ada angka yang menggunakan koma
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = "Rp" + total;
   
}

