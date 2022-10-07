import { message } from "../message/message.js";
const url =
  "https://sheets.googleapis.com/v4/spreadsheets/1c-UabJv4YCvKHUHmo75vLGwB7Nflt0UbDS7DZf3Iq74/values/All?&key=AIzaSyBH_CwQRbwk6m0FKYcSnJEZl7OARPTsLW4";
const checkOutItem = document.querySelector(".checkout-item");
const itemCont = document.querySelector(".itemCont");
async function apiCall() {
  try {
    const productDatabase = await fetch(url);
    const result = await productDatabase.json();

    // console.log(result);

    const details = result.values;
    console.log(typeof details);
    checkOutItem.innerHTML = "";
    const storage = sessionStorage.key(1);
    if (storage) {
      for (let i = 1; i < details.length; i++) {
        const id = details[i][0];
        console.log(id);
        const discount = details[i][9];
        console.log(discount.length);
        const myItems = sessionStorage.getItem(id);
        console.log(typeof myItems);
        if (myItems !== null) {
          checkOutItem.innerHTML += `<div class="itemX">${myItems}</div> <form class="item-sizes">
          <input type="radio" id="size-s" name="item-sizes">
          <label for="size-s" class="size-s">S</label>
          <input type="radio" id="size-m" name="item-sizes">
          <label for="size-m" class="size-m">M</label>
          <input type="radio" id="size-l" name="item-sizes">
          <label for="size-l" class="size-l">L</label>
          <input type="radio" id="size-xl" name="item-sizes">
          <label for="size-xl" class="size-xl">XL</label>
      </form>
      <br>
      <form class="item-pieces">
          <input type="button" id="minus" value="-">
          <p class="pieces-number">1</p>
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
// import { message } from "../message/message.js";
// const url =
//   "https://sheets.googleapis.com/v4/spreadsheets/1c-UabJv4YCvKHUHmo75vLGwB7Nflt0UbDS7DZf3Iq74/values/All?&key=AIzaSyBH_CwQRbwk6m0FKYcSnJEZl7OARPTsLW4";
// const cartBox = document.querySelector(".cart-box");
// async function apiCall() {
//   try {
//     const productDatabase = await fetch(url);
//     const result = await productDatabase.json();

//     // console.log(result);

//     const details = result.values;
//     cartBox.innerHTML = "";
//     const storage = sessionStorage.key(1);
//     if (storage) {
//       for (let i = 1; i < details.length; i++) {
//         const id = details[i][0];
//         console.log(id);
//         const myItems = sessionStorage.getItem(id);
//         console.log(typeof myItems);
//         if (myItems !== null) {
//           console.log("its working");
//           cartBox.innerHTML += myItems;
//           const removeAdd = document.querySelector(".add-icon");
//           removeAdd.remove();
//           const removeLike = document.querySelector(".like-icon");
//           removeLike.remove();
//           const removeMark = document.querySelector(".mark");
//           removeMark.remove();
//           document.querySelector(".product-sample").className = "cart-box-item";
//           continue;
//         }
//       }
//     } else {
//       document.querySelector(".checkout-container").innerHTML =
//         "Your Cart Is Empty";
//     }
//   } catch (error) {
//     console.log(error);
//     cartBox.innerHTML = message("error", error);
//   }
// }

// apiCall();
