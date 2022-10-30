import { message } from "./message/message.js";

const productDetails = document.querySelector(".single-product");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

console.log(params);

const id = params.get("id");

console.log(id);

const url = "https://aarabejo.shop/rainydays/wp-json/wc/store/products/" + id;

async function apiCall() {
  try {
    const productDatabase = await fetch(url);
    const result = await productDatabase.json();

    console.log(result);

    displayDetails(result);
  } catch (error) {
    console.log(error);
    productDetails.innerHTML = message("error", error);
  }
}

apiCall();

function displayDetails(result) {
  productDetails.innerHTML = `<div class="product-details">
  <h1>${result.name}</h1>
                        <img src="${result.images[0].src}" class ="product-picture">
                        ${result.description}
                        </div>
                        `;
}
