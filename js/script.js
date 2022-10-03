import { message } from "./message/message.js";

const url = "https://sheets.googleapis.com/v4/spreadsheets/1c-UabJv4YCvKHUHmo75vLGwB7Nflt0UbDS7DZf3Iq74/values/All?&key=AIzaSyBH_CwQRbwk6m0FKYcSnJEZl7OARPTsLW4" ;

console.log(url);

const productPic = document.querySelector("#indexproduct");

async function apiCall() {
    try{
        const productDatabase = await fetch(url);
        const result = await productDatabase.json();

        console.log(result);

        const details = result.values;

        productPic.innerHTML="";

        for (let i = 1; i < details.length; i++) {

            const pic = details[i][10];
            const name = details[i][1];
            const description = details[i][2];
            const price = details[i][7];
            const marked = details[i][8];
            const discount = details[i][9];

            if (i === 9 ){
                break;
            }

            productPic.innerHTML += `<div>
                                        <div class="product-sample">
                                            <img class="picture" src="${pic}">
                                            <div class="like-icon" >
                                                <svg class="heart" viewBox="-1 -1 38 39">
                                                <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                                                c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
                                                </svg> 
                                            </div>
                                            <div class="sale">${marked}</div>
                                        </div>
                                        <img src="icons/Add cart icon.png" class="add-icon">
                                        <p>${name}</p>
                                        <p>${description}</p>
                                        <p>${price}</p>
                                        <p>${discount}</p>
                                    </div>
    `;

        }

    }

    catch(error){
        console.log(error);
        productPic.innerHTML = message("error", error);
    }
}

apiCall();