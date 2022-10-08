import { message } from "../message/message.js";
const url =
  "https://sheets.googleapis.com/v4/spreadsheets/1c-UabJv4YCvKHUHmo75vLGwB7Nflt0UbDS7DZf3Iq74/values/All?&key=AIzaSyBH_CwQRbwk6m0FKYcSnJEZl7OARPTsLW4";
const cartBox = document.querySelector(".cart-box");
const topCart = document.querySelector(".top-cart");
const gotoCheck = document.querySelector(".goto-checkout");
async function apiCall() {
  try {
    const productDatabase = await fetch(url);
    const result = await productDatabase.json();

    // console.log(result);

    const details = result.values;
    cartBox.innerHTML = "";

    const prdId = [];
    for (let i = 1; i < details.length; i++) {
      const id = details[i][0];
      console.log(id);
      prdId.push(id);
    }
    // console.log(prdId);
    const storedKey = prdId.filter(matchKey);
    function matchKey(prdId) {
      const storage = Object.keys(sessionStorage);
      //   console.log(storage);
      for (let i = 1; i < storage.length; i++) {
        const sessionStorageKey = storage[i];
        // console.log(sessionStorageKey);
        return sessionStorageKey == prdId;
      }
    }
    const storage = Object.keys(sessionStorage);
    console.log(storage);
    if (storedKey.length === 1) {
      for (let i = 1; i < storage.length; i++) {
        const storedItem = storage[i];
        // console.log(storedItem);
        const myItems = sessionStorage.getItem(storedItem);
        console.log(typeof myItems);
        cartBox.innerHTML += myItems;
        const removeAdd = document.querySelector(".add-icon");
        removeAdd.remove();
        const removeLike = document.querySelector(".like-icon");
        removeLike.remove();
        const removeMark = document.querySelector(".mark");
        removeMark.remove();
        document.querySelector(".product-sample").className = "cart-box-item";
        gotoCheck.style.display = "inline-block";
        continue;
      }
    } else {
      cartBox.innerHTML = "Your Cart Is Empty";
      gotoCheck.style.display = "none";
    }
  } catch (error) {
    console.log(error);
    cartBox.innerHTML = message("error", error);
  }
}

topCart.onmouseover = apiCall;

/*export function cart(addCart, x) {
  const cartBox = document.querySelector(".cart-box");
  for (let i = 0; i < addCart.length; i++) {
    const cartId = addCart[i].id;
    console.log(cartId);
    const myCart = sessionStorage.getItem(cartId);
    console.log(myCart);
    // const cartItems = JSON.stringify(myCart);
    // console.log(cartItems);
    if (myCart === x) {
      cartBox.innerHTML += myCart;
      const removeAdd = document.querySelector(".add-icon");
      removeAdd.remove();
      const removeLike = document.querySelector(".like-icon");
      removeLike.remove();
      const removeMark = document.querySelector(".mark");
      removeMark.remove();
      document.querySelector(".product-sample").className = "cart-box-item";
      // const text = document.querySelector(".itemText");
      // text.innerHTML +=` <p>Remove</p>`;
      // console.log(text);
      break;
    }
  }
}*/