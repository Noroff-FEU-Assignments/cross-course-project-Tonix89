import { message } from "../message/message.js";
const url =
  "https://sheets.googleapis.com/v4/spreadsheets/1c-UabJv4YCvKHUHmo75vLGwB7Nflt0UbDS7DZf3Iq74/values/All?&key=AIzaSyBH_CwQRbwk6m0FKYcSnJEZl7OARPTsLW4";
const checkOutItem = document.querySelector(".checkout-item");
const itemCont = document.querySelector(".itemCont");
const itemCount = document.querySelector(".itemcount");
const storage = Object.keys(localStorage);
console.log(storage.length);
itemCount.innerHTML = storage.length;
async function apiCall() {
  try {
    const productDatabase = await fetch(url);
    const result = await productDatabase.json();

    // console.log(result);

    const details = result.values;
    console.log(typeof details);
    checkOutItem.innerHTML = "";
    const storage = localStorage.key(0);
    if (storage) {
      for (let i = 1; i < details.length; i++) {
        const id = details[i][0];
        console.log(id);
        const discount = details[i][9];
        console.log(discount.length);
        const myItems = localStorage.getItem(id);
        // console.log(myItems.length);
        // const djf = myItems.length;
        if (myItems !== null) {
          checkOutItem.innerHTML += `<div class="itemX">${myItems}</div> <div class="item-sizes">
          <button  id="size-xs" name="item-sizes">XS</button>
          <button  id="size-s" name="item-sizes">S</button>
          <button  id="size-m" name="item-sizes">M</button>
          <button  id="size-l" name="item-sizes">L</button>
          <button  id="size-xl" name="item-sizes">XL</button>
      </div>
      <br>
      <form class="item-pieces">
          <input type="button" id="minus" value="-">
          <div class="pieces-number">1</div>
          <input type="button" id="plus" value="+">
          <button type="reset" class="remove-button">Remove</button>
      </form> <hr class="itemhr">`;
          document.querySelector(".add-icon").remove();
          document.querySelector(".like-icon").remove();
          document.querySelector(".mark").remove();
          document.querySelector(".product-sample").className = "cart-box-item";
          document.querySelector(".itemText").className = "cart-text";
          if (discount.length != 0) {
            document.querySelector(".discount").className = "lastPrice";
            document.querySelector(".price").remove();
          } else {
            document.querySelector(".price").className = "lastPrice";
          }
          continue;
        }
      }
    } else {
      checkOutItem.innerHTML = "Your Cart Is Empty";
    }
  } catch (error) {
    console.log(error);
    checkOutItem.innerHTML = message("error", error);
  }
}
apiCall();
