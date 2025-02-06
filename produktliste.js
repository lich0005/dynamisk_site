const myCategory = new URLSearchParams(window.location.search).get("category");

const product_list_container = document.querySelector(".product_list_container");

const overskrift = document.querySelector("h2");

overskrift.innerHTML = myCategory;

fetch(`https://kea-alt-del.dk/t7/api/products?category=${myCategory}`) //hvis jeg skriver ?limit=100  bag på får jeg 100 produkter i visning
  .then((response) => response.json())
  .then((data) => showList(data));

function showList(products) {
  console.log(products);

  let markup = products.map((product) => {
    return `
<div class="card">
        <a href="produkt.html?id=${product.id}">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
            alt="${product.productdisplayname}"></a>

  <div class="card-text">          
        <h3>${product.productdisplayname}</h3>
        <p>${product.brandname} - ${product.articletype}</p>
    <div class="price_discount"> 
          <p>${product.price} kr</p> 
          <p class="discount ${product.discount && "vis"}">${product.discount}%</p>
    </div>
        <a href="produkt.html?id=${product.id}">Read more</a>
  </div>

  <div class="sold_out ${product.soldout && "vis"}"><h3>Sold out</h3></div>
</div>
`;
  });
  const string = (product_list_container.innerHTML = markup.join(" "));
  console.log(string);
}
