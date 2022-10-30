import { message } from "./message/message.js";
import { product } from "./product.js";
import { productPic } from "./product.js";
import { itemCount } from "./product.js";

const url =
  "https://aarabejo.shop/rainydays/wp-json/wc/store/products?per_page=30&category=18";

console.log(url);

const storage = Object.keys(localStorage);
console.log(storage.length);
itemCount.innerHTML = storage.length;

async function apiCall() {
  try {
    const productDatabase = await fetch(url);
    const result = await productDatabase.json();

    console.log(result);

    product(result);
  } catch (error) {
    console.log(error);
    productPic.innerHTML = message("error", error);
  }
}
apiCall();
