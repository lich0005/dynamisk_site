let productContainer = document.querySelector(".product_container"); //istedet for productContainer skal jeg referere til navnet fra mit eget html

const id = new URLSearchParams(window.location.search).get("id");

let productId = id;

fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  .then((Response) => Response.json())
  .then((data) => showProduct(data));

function showProduct(data) {
  productContainer.innerHTML = `   
    <div class="product-image">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${data.id}.webp" alt="product image">
          <h3 class="sold_out ${data.soldout ? "vis" : ""}">Sold Out</h3>
    </div>

            
    <div class="product-info">
            <div>
                <h2> ${data.productdisplayname}</h2>

                <div class="price_single"> 
                    <h3>${data.price} kr</h3>           
                    <h3 class="discount ${data.discount && "vis"}">${data.discount}%</h3>
                </div>

                    <h3><span class="grey"><br>Brand:</span> ${data.brandname}</h3>
                    <h4><span class="grey">Color:</span> ${data.basecolour}<br><br></h4>


                    <h3 class="grey">Description: </h3>
                    <p>${data.description}</p>
            </div>
              
            <div class="sizing">
                    <label for="size">Choose a size:</label>
                    <select id="size">
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                    <button>Add to basket</button>
            </div>
    </div>
        `;
}
