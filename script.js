// an array with all of our cart items
var $ = $;
var cart = [];
var source = $("#entry-template").html();
var template = Handlebars.compile(source);
var sourcePrd = $("#product-template").html();
var templatePrd = Handlebars.compile(sourcePrd);

var init = function () {
    if (typeof (Storage) !== "undefined") {
        cart = JSON.parse(localStorage.cart);
    } else {
        // Sorry! No Web Storage support..
    }
    updateCart();
    buildProducts();
}

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
    store_loc_storage(cart);
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
    localStorage.clear();
}

var buildProducts = function () {
    var jqxhr = $.getJSON("/amaz", function (data) {
            data.forEach((item) => {
                var price = item.ItemAttributes[0].ListPrice !== undefined?item.ItemAttributes[0].ListPrice[0].Amount[0]:'N/A';
                var title = item.ItemAttributes[0].Title;
                var image  = item.LargeImage[0].URL[0]
                $('.products').append(templatePrd({
                    img: image,
                    name: title,
                    price: price/100
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

var store_loc_storage = function (str) {
    if (typeof (Storage) !== "undefined") {
        localStorage.cart = JSON.stringify(str);
    } else {
        // Sorry! No Web Storage support..
    }
}

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
    updateCart();
});

// update the cart as soon as the page loads!
init();