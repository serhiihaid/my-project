function lightOrDark(color) {

    // Variables for red, green, blue values
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {

        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {

        return 'light';
    }
    else {

        return 'dark';
    }
}

// ====================================

// Interaction for color pick ...............................
(function () {
	let colorBox = document.querySelector("main .pop-items form .color ul.colors");

	// Initial states
	colorBox.children[0].classList.add("active");

	// Add listeners
	colorBox.addEventListener("click", (e) => {
		(Array.from(colorBox.children)).forEach(child => {
			child.classList.remove("active");
			child.style.borderColor = "";
		});
		e.target.classList.add("active");

		// Pick contrasting border
		lightOrDark(e.target.style.backgroundColor) === "light" ? e.target.style.borderColor = "#000" : e.target.style.borderColor = "#ccc";
	}, true);
})();



// Add to cart buttons .....................................
(function () {
	let addToCart = document.querySelectorAll("section.pop-items button.addToCart");

	addToCart.forEach(button => {

		button.addEventListener("click", () => {

			addItem("cart");

		}, true);

	});
})();

// Add to wishlist buttons .................................
(function () {
	let addToWishlist = document.querySelectorAll("section.pop-items button.addToWishlist");

	addToWishlist.forEach(button => {

		button.addEventListener("click", () => {

			addItem("wishlist");

		}, true);

	});
})();


// Create item
function createItem (imageURL, name, price) {

	let item = document.createElement("div");
	item.classList.add("item");

	let itemImage = document.createElement("div");
	itemImage.classList.add("img");
	itemImage.style.backgroundImage = `url(${imageURL})`;
	item.append(itemImage);

	let itemName = document.createElement("h4");
	itemName.classList.add("name");
	itemName.innerText = name;
	item.append(itemName);

	let itemPrice = document.createElement("span");
	itemPrice.innerText = "$ " + price;
	item.append(itemPrice);


	let itemOverlay = document.createElement("div");
	itemOverlay.classList.add("overlay");

	let itemCart = document.createElement("button");
	itemCart.classList.add("addToCart");
	let cartImage =  document.createElement("img");
	cartImage.src = "img/icons/plus.svg";
	itemCart.append(cartImage);
	itemOverlay.append(itemCart);

	let itemWishlist = document.createElement("button");
	itemWishlist.classList.add("addToWishlist");
	let wishlistImage =  document.createElement("img");
	wishlistImage.src = "img/icons/heart-filled.svg";
	itemWishlist.append(wishlistImage);
	itemOverlay.append(itemWishlist);


	item.append(itemOverlay);

	return item;
}