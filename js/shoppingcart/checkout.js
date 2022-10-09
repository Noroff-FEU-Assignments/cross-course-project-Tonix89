import { message } from "../message/message.js";
import { payOrder } from "./total.js";
import { remove } from "../buttons/remove.js";

const url =
  "https://sheets.googleapis.com/v4/spreadsheets/1c-UabJv4YCvKHUHmo75vLGwB7Nflt0UbDS7DZf3Iq74/values/All?&key=AIzaSyBH_CwQRbwk6m0FKYcSnJEZl7OARPTsLW4";
const checkOutItem = document.querySelector(".checkout-item");
const checkCont = document.querySelector(".checkout-container");
const itemCount = document.querySelector(".itemcount");
const storage = Object.keys(localStorage);
console.log(storage.length);
itemCount.innerHTML = storage.length;
const removeId = document.querySelectorAll(".remove.button");
console.log(removeId);

async function apiCall() {
  try {
    const productDatabase = await fetch(url);
    const result = await productDatabase.json();

    // console.log(result);

    const details = result.values;
    console.log(typeof details);
    checkOutItem.innerHTML = "";
    if (storage.length >= 1) {
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
          <div class="remove-button ${id}">
          <button type="reset" >Remove</button>
          </div>
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
      checkCont.innerHTML = "Your Cart Is Empty";
      document.querySelector(".pay-order").style.display = "none";
    }
    const lastPrice = document.querySelectorAll(".lastPrice");
    console.log(lastPrice);
    const discounted = document.querySelectorAll(".discount");
    console.log(discounted);
    payOrder(lastPrice, discounted);
  } catch (error) {
    console.log(error);
    checkOutItem.innerHTML = message("error", error);
  }
}
apiCall();
