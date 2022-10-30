import { itemCount } from "../product.js";
import { productPic } from "../product.js";
import { message } from "../message/message.js";
import { product } from "../product.js";

// console.log(url);
export function filterCategory(cat, url) {
  const newUrl = url + "&category=" + cat;
  console.log(newUrl);
  const storage = Object.keys(localStorage);
  // console.log(storage[0]);
  itemCount.innerHTML = storage.length;

  async function apiCall() {
    try {
      const productDatabase = await fetch(newUrl);
      const result = await productDatabase.json();

      console.log(result);

      product(result);
    } catch (error) {
      // console.log(error);
      productPic.innerHTML = message("error", error);
    }
  }
  apiCall();
}
