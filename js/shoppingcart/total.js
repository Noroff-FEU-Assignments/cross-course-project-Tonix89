export function payOrder(lastPrice, discounted) {
  //   console.log(lastPrice);
  //   console.log(discounted);
  let sum1 = 0;
  for (let i = 0; i < discounted.length; i++) {
    const discountPrice = discounted[i].innerHTML;
    // console.log(discountPrice.length);
    if (discountPrice.length !== 0) {
      const fgh = parseFloat(discountPrice);
      //   console.log(fgh);
      sum1 += fgh;
      continue;
    }
  }
  //   console.log(sum1);
  let sum2 = 0;

  for (let i = 0; i < lastPrice.length; i++) {
    const price = lastPrice[i].innerHTML;
    // console.log(price.length);
    if (price.length !== 0) {
      const fwsef = parseFloat(price);
      //   console.log(fwsef);
      sum2 += fwsef;
      continue;
    }
  }
  //   console.log(sum2);
  const total = sum1 + sum2;
  document.querySelector(".totalPrice").innerHTML = total + "  kr.";
}
