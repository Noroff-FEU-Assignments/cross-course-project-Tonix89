import { message } from "./message/message.js";
import { product } from "./product.js";
import { productPic } from "./product.js";
import { itemCount } from "./product.js";
import { filterCategory } from "./filter/categoryfilter.js";
import { nofilter } from "./filter/nofilter.js";

const category = document.getElementById("category");
console.log(category);
const url =
  "https://aarabejo.shop/rainydays/wp-json/wc/store/products?per_page=30&category=17";
console.log(url);

// function selectCat() {
//   let cat = category.value;
//   console.log(cat);
//   if (cat != "All") {
//     filterCategory(cat, url);
//   } else {
//     nofilter(url);
//   }
// }
// category.onchange = function () {
//   selectCat();
// };

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
