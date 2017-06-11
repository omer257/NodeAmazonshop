// an array with all of our cart items
var cart = [];
var source = $("#entry-template").html();
var template = Handlebars.compile(source);
var updateCart = function () {
    // TODO: Write this function. In this function we render the page.
    // Meaning we make sure that all our cart items are displayed in the browser.
    // Remember to empty the "cart div" before you re-add all the item elements.
    //    console.log(cart);
    $('.cart-list').empty();
    var total = 0;
    cart.forEach((item, val) => {
        $('.cart-list').append(template({
            amount: cart[val].amount,
            name: cart[val].name,
            price: cart[val].price
        }));
        total = total + parseInt(cart[val].price)* parseInt(cart[val].amount);
    });
    $('.total').html(total);
}
var addItem = function (item) {
    // TODO: Write this function. Remember this function has nothing to do with display. 
    // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
    var foundIndex= cart.findIndex((itemX) => {
        return itemX.name === item.name;
    });
    if(foundIndex===-1){
        cart.push(item);
    }
    else{
        cart[foundIndex].amount +=1 ;
    }
}
var clearCart = function () {
    cart = [];
    updateCart();
    // TODO: Write a function that clears the cart ;-)
}
$('.view-cart').on('click', function () {
    // TODO: hide/show the shopping cart!
    $('.shopping-cart').toggle();
});


$('body').on('click', '.remove', function() {
    // do something
    cart.splice($(this).index(),1);
    updateCart();
});
 
$('.add-to-cart').on('click', function () {
    // TODO: get the "item" object from the page
    var minElem = $(this).parents('.item');
    var p_price = minElem.attr("data-price");
    var p_name = minElem.attr("data-name");
    addItem({
        amount: 1,
        name: p_name,
        price: p_price
    });
    updateCart();
});
$('.clear-cart').on('click', function () {
    clearCart();
});
// update the cart as soon as the page loads!
updateCart();
