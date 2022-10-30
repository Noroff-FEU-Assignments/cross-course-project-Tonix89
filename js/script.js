//import { cart } from "./shoppingcart/cart.js";
import { message } from "./message/message.js";

const url =
  "https://aarabejo.shop/rainydays/wp-json/wc/store/products?featured=true";

const productPic = document.querySelector("#indexproduct");
const itemCount = document.querySelector(".itemcount");

async function apiCall() {
  try {
    const productDatabase = await fetch(url);
    const result = await productDatabase.json();

    console.log(result);

    productPic.innerHTML = "";

    for (let i = 0; i < result.length; i++) {
      const pic = result[i].images[0].src;
      console.log(pic);
      const tags = result[i].tags;
      console.log(tags);
      let mark = "";
      if (tags.length !== 0) {
        mark = result[i].tags[0].name;
        console.log(mark);
      }
      let salePrice = "";
      if (result[i].on_sale === true) {
        salePrice = result[i].prices.sale_price;
      }

      productPic.innerHTML += `<div id="${result[i].id}">
                <div class="product-sample">
                <a href="specificpage.html?id=${result[i].id}"><img class="picture" src="${pic}"></a>
                <div class="like-icon" >
                    <svg class="heart" viewBox="-1 -1 38 39">
                    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                    c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
                    </svg> 
                </div>
                <div class="mark">${mark}</div>
            </div>
            <input type="image" src="icons/Add cart icon.png" class="add-icon ${result[i].id}"   name="add to cart" />
            <div class="itemText">
                <div>
                    <p>${result[i].name}</p>
                    <p class="description">${result[i].short_description}</p>
                </div>
                <div>
                    <p class="price">${result[i].prices.regular_price}</p>
                    <p class="discount">${salePrice}</p>
                </div>
                </div>
            </div>
            `;
    }
    const listMarked = document.querySelectorAll(".mark");
    // console.log(listMarked);
    for (let i = 0; i < listMarked.length; i++) {
      const marked = listMarked[i].innerText;
      console.log(marked);
      const markedList = listMarked[i];
      if (marked) {
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
      const cartId = addCart[i].classList[1];
      console.log(cartId);
      const click = addCart[i];
      click.onclick = function () {
        const storage = Object.keys(localStorage);
        console.log(storage);
        if (storage.length !== 0) {
          for (let i = 0; i < storage.length; i++) {
            const storageKey = storage[i];
            console.log(storageKey);
            console.log(click.id);
            if (storageKey === click.classList[1]) {
              alert("Item already added in the cart");
            } else {
              const product = document.querySelectorAll(".product");
              for (let i = 0; i < product.length; i++) {
                const productList = product[i].children;
                for (let i = 0; i < productList.length; i++) {
                  const singleProduct = productList[i].id;
                  const x = productList[i].innerHTML;
                  if (cartId === singleProduct) {
                    localStorage.setItem(singleProduct, x);
                    const storage = Object.keys(localStorage);
                    console.log(storage[0]);
                    itemCount.innerHTML = storage.length;
                  }
                }
              }
            }
          }
        } else {
          const product = document.querySelectorAll(".product");
          for (let i = 0; i < product.length; i++) {
            const productList = product[i].children;
            for (let i = 0; i < productList.length; i++) {
              const singleProduct = productList[i].id;
              const x = productList[i].innerHTML;
              if (cartId === singleProduct) {
                localStorage.setItem(singleProduct, x);
                const storage = Object.keys(localStorage);
                console.log(storage[0]);
                itemCount.innerHTML = storage.length;
              }
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

// Below are codes using google sheet as database while above is using wordpress

/*const url =
  "https://sheets.googleapis.com/v4/spreadsheets/1c-UabJv4YCvKHUHmo75vLGwB7Nflt0UbDS7DZf3Iq74/values/All?&key=AIzaSyBH_CwQRbwk6m0FKYcSnJEZl7OARPTsLW4";

// console.log(url);

const productPic = document.querySelector("#indexproduct");
const itemCount = document.querySelector(".itemcount");

async function apiCall() {
  try {
    const productDatabase = await fetch(url);
    const result = await productDatabase.json();

    // console.log(result);

    const details = result.values;

    productPic.innerHTML = "";

    const storage = Object.keys(localStorage);
    console.log(storage.length);
    itemCount.innerHTML = storage.length;

    for (let i = 1; i < details.length; i++) {
      const pic = details[i][10];
      const name = details[i][1];
      const description = details[i][2];
      const price = details[i][7];
      const marked = details[i][8];
      const discount = details[i][9];

      if (i === 9) {
        break;
      }
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
              localStorage.setItem(singleProduct, x);
              const itemCount = document.querySelector(".itemcount");
              const storage = Object.keys(localStorage);
              console.log(storage.length);
              itemCount.innerHTML = storage.length;
              //cart(addCart, x);
              /*const cartEmpty = document.querySelector(".cart-empty");
              cartEmpty.remove();
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
*/
