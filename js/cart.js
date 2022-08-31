// Hard coded items
const cartPreload = [
  {
    fd: "",
    image: "img/cart/purchase-paceholder.jpg",
    name: "Kristina Dam Oak Table With White Marble Top",
    price: 2195,
  },
  {
    image: "img/cart/purchase-paceholder.jpg",
    name: "Activate Facial Mask and Charcoal Soap",
    price: 1249,
  },
];

// Find items box
const itemBox = document.querySelector("section.cart div.items");

// Form items
(function (JSONObject) {
  // For each loader item - create item in HTML ................
  for (let i = 0; i < JSONObject.length; i++) {
    // item
    let item = document.createElement("div");
    item.className = "item";

    // image
    let image = document.createElement("img");
    image.src = JSONObject[i].image;

    item.append(image);

    // info
    let info = document.createElement("div");
    info.className = "info";

    let itemName = document.createElement("h4");
    itemName.innerText = JSONObject[i].name;
    info.append(itemName);

    let itemPrice = document.createElement("span");
    itemPrice.innerText = formatMoney(JSONObject[i].price);
    info.append(itemPrice);

    item.append(info);

    // amountpick
    let amountpick = document.createElement("div");
    amountpick.className = "amountpick";

    let minus = document.createElement("button");
    minus.classList.add("minus");
    minus.innerText = "-";
    amountpick.append(minus);

    let amount = document.createElement("input");
    amount.type = "number";
    amount.name = "amountpick";
    amount.value = 1;
    amountpick.append(amount);

    let plus = document.createElement("button");
    plus.classList.add("plus");
    plus.innerText = "+";
    amountpick.append(plus);

    item.append(amountpick);

    // price
    let amountPrice = document.createElement("h3");
    amountPrice.className = "price";
    amountPrice.innerText = formatMoney(JSONObject[i].price);

    item.append(amountPrice);

    // delete button
    let deleteBox = document.createElement("div");
    deleteBox.classList.add("delete");

    let deleteButton = document.createElement("button");
    let deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-times";

    deleteButton.append(deleteIcon);
    deleteBox.append(deleteButton);

    item.append(deleteBox);

    itemBox.append(item);
  }
})(cartPreload);

// Function to format the price
function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      "$" +
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}

// Amount select ..............................
let amount = document.querySelectorAll(
  "section.cart div.items div.item div.amountpick > input"
);
let minus = document.querySelectorAll(
  "section.cart div.items div.item div.amountpick > button.minus"
);
let plus = document.querySelectorAll(
  "section.cart div.items div.item div.amountpick > button.plus"
);

// Interaction and amount validate ..............................

// Find items prices outputs
const itemsPrices = document.querySelectorAll(
  "section.cart div.items div.item h3.price"
);

// Find cartSubtotal
const cartSubtotal = document.querySelector(
  "section.cart form.manage div.checkout div.subtotal span.price"
);

// Find cartTotal
const cartTotal = document.querySelector(
  "section.cart form.manage div.checkout div.total span.price"
);

// Initial prices ..............................

// Update cartSubtotal
cartSubtotal.innerText = sumTotal();

// Update cartTotal
cartTotal.innerText = sumTotal();

// Amounts listeneres
for (let i = 0; i < amount.length; i++) {
  // Initial value
  amount[i].value = 1;

  // Add listeners
  minus[i].addEventListener(
    "click",
    () => {
      amount[i].focus();
      amount[i].value <= 1 ? (amount[i].value = 1) : amount[i].value--;

      // Count items price
      itemsPrices[i].innerText = formatMoney(
        amount[i].value * cartPreload[i].price
      );

      // Update cartSubtotal
      cartSubtotal.innerText = sumTotal();

      // Update cartTotal
      cartTotal.innerText = sumTotal();
    },
    true
  );
  plus[i].addEventListener(
    "click",
    () => {
      amount[i].focus();
      amount[i].value >= 99 ? (amount[i].value = 9) : amount[i].value++;

      // Count items price
      itemsPrices[i].innerText = formatMoney(
        amount[i].value * cartPreload[i].price
      );

      // Update cartSubtotal
      cartSubtotal.innerText = sumTotal();

      // Update cartTotal
      cartTotal.innerText = sumTotal();
    },
    true
  );
}

// Shipping listeners .......................................

// Find shipping
const shipping = document.querySelectorAll(
  "section.cart form.manage div.shipping ul.radios li input"
);

// Add event listeners to each
shipping.forEach((radio) => {
  radio.addEventListener(
    "click",
    () => {
      // Update cartTotal
      cartTotal.innerHTML = sumTotal(Number.parseFloat(radio.value));
    },
    true
  );
});

// Function for formatting price out of number
function sumTotal(shipping = 0) {
  let sum = 0;

  for (let i = 0; i < cartPreload.length; i++) {
    sum += amount[i].value * cartPreload[i].price;
  }

  // If no items in the cart
  if (sum <= 0) {
    sum = 0;
  } else {
    sum += shipping;
  }

  return formatMoney(sum);
}

// Delete item .......................................

(function () {
  // Find items
  const items = document.querySelectorAll("section.cart div.items div.item");

  // Find their delete buttons
  const itemsDeletes = document.querySelectorAll(
    "section.cart div.items div.item div.delete button"
  );

  // For each...
  for (let i = 0; i < itemsDeletes.length; i++) {
    // Add event listeners to buttons
    itemsDeletes[i].addEventListener(
      "click",
      () => {
        // Remove child from the parent - itemsBox
        itemBox.removeChild(items[i]);

        // Update Cart
        cartPreload[i].price = 0;

        // Update prices:
        // Update cartSubtotal
        cartSubtotal.innerText = sumTotal();

        // Update cartTotal
        cartTotal.innerText = sumTotal();

        // If there's no items
        if (itemBox.children.length === 0) {
          // Create notation
          let noItems = document.createElement("h2");
          noItems.innerText = "You have no items in the cart.";
          itemBox.append(noItems);
        }
      },
      true
    );
  }
})();
