export const productContainer = document.querySelector(".products");

export const renderProduct = (
  coverImg: string,
  productName: string,
  productPrice: string
) => `<div class="product">
        <img src="${coverImg}" />
        <span>
          <strong>${productName}</strong>
          <p>$${productPrice}</p>
        </span>
      </div>`;
