// an array with all of our cart items
var $ = $;
var cart = [];
var source = $("#entry-template").html();
var template = Handlebars.compile(source);


var sourcePrd = $("#product-template").html();
var templatePrd = Handlebars.compile(sourcePrd);
var updateCart = function () {
    $('.cart-list').empty();
    let total = 0;
    cart.forEach((item, val) => {
        $('.cart-list').append(template({
            amount: cart[val].amount,
            name: cart[val].name,
            price: cart[val].price
        }));
        total = total + parseInt(cart[val].price) * parseInt(cart[val].amount);
    });
    $('.total').html(total);
}
var addItem = function (item) {
    var foundIndex = cart.findIndex((itemX) => {
        return itemX.name === item.name;
    });
    if (foundIndex === -1) {
        cart.push(item);
    } else {
        cart[foundIndex].amount += 1;
    }
}
var clearCart = function () {
    cart = [];
    updateCart();
    // TODO: Write a function that clears the cart ;-)
}
var buildProducts = function () {
    var jqxhr = $.getJSON("/json", function (data) {
            data.forEach((item) => {
                $('.products').append(templatePrd({
                    img: item.img,
                    name: item.name,
                    price: item.price
                }));
            })

        })
        .fail(function () {
            console.log("error");
        })
}
$('.view-cart').on('click', function () {
    $('.shopping-cart').toggle();
});


$('body').on('click', '.remove', function () {
    cart.splice($(this).index(), 1);
    updateCart();
});

$('body').on('click', '.add-to-cart', function () {
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
buildProducts();
