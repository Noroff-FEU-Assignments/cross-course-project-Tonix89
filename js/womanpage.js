import { message } from "./message/message.js";

const url =
  "https://sheets.googleapis.com/v4/spreadsheets/1c-UabJv4YCvKHUHmo75vLGwB7Nflt0UbDS7DZf3Iq74/values/Woman?&key=AIzaSyBH_CwQRbwk6m0FKYcSnJEZl7OARPTsLW4";

console.log(url);

const productPic = document.querySelector("#indexproduct");

async function apiCall() {
  try {
    const productDatabase = await fetch(url);
    const result = await productDatabase.json();

    console.log(result);

    const details = result.values;

    productPic.innerHTML = "";

    for (let i = 1; i < details.length; i++) {
      const pic = details[i][10];
      const name = details[i][1];
      const description = details[i][2];
      const price = details[i][7];
      const marked = details[i][8];
      const discount = details[i][9];

      productPic.innerHTML += `<div class="${details[i][0]}">
      <div class="product-sample">
      <img class="picture" src="${pic}">
      <div class="like-icon" >
          <svg class="heart" viewBox="-1 -1 38 39">
          <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
          c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
          </svg> 
      </div>
      <div class="mark">${marked}</div>
  </div>
  <input type="image" src="icons/Add cart icon.png" class="add-icon"  id="${details[i][0]}" name="add to cart" />
  <div class="itemText">
      <div>
          <p>${name}</p>
          <p>${description}</p>
      </div>
      <div>
          <p class="price">${price}</p>
          <p class="discount">${discount}</p>
      </div>
  </div>
</div>
`;
    }

    const listMarked = document.querySelectorAll(".mark");
    // console.log(listMarked);
    for (let i = 0; i < listMarked.length; i++) {
      const sale = listMarked[i].innerText;
      const markedList = listMarked[i];
      if (sale) {
        markedList.classList.add("salestyle");
        continue;
      }
    }
    const discounted = document.querySelectorAll(".discount");
    // console.log(discounted);
    const origPrice = document.querySelectorAll(".price");
    for (let i = 0; i < discounted.length && i < origPrice.length; i++) {
      const discount = discounted[i].innerText;
      const voidPrice = origPrice[i];
      if (discount) {
        voidPrice.classList.add("voidpricestyle");
        continue;
      }
    }

    const addCart = document.querySelectorAll(".add-icon");
    console.log(addCart);
    //cart(addCart);
    for (let i = 0; i < addCart.length; i++) {
      const cartId = addCart[i].id;
      console.log(cartId);
      const click = addCart[i];
      click.onclick = function () {
        const product = document.querySelectorAll(".product");
        for (let i = 0; i < product.length; i++) {
          const productList = product[i].children;
          for (let i = 0; i < productList.length; i++) {
            const singleProduct = productList[i].className;
            const x = productList[i].innerHTML;
            if (cartId === singleProduct) {
              sessionStorage.setItem(singleProduct, x);
              cart(addCart, x);
              /*const cartEmpty = document.querySelector(".cart-empty");
              cartEmpty.remove();*/
              break;
            }
          }
        }
      };
    }
  } catch (error) {
    console.log(error);
    productPic.innerHTML = message("error", error);
  }
}

apiCall();
