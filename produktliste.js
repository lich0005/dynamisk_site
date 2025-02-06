const myCategory = new URLSearchParams(window.location.search).get("category");

const product_list_container = document.querySelector(".product_list_container");

const overskrift = document.querySelector("h2");

const searchBar = document.getElementById("searchBar");
let allProducts = []; // Store all products for filtering

overskrift.innerHTML = myCategory;

fetch(`https://kea-alt-del.dk/t7/api/products?category=${myCategory}`) //hvis jeg skriver ?limit=100  bag på får jeg 100 produkter i visning
  .then((response) => response.json())
  .then((data) => {
    allProducts = data; // Save all products
    showList(data); // Show all products initially
  });

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
        <h4>${product.brandname} - ${product.articletype}</h4>
    <div class="price_discount"> 
          <h4>${product.price} kr</h4> 
          <h4 class="discount ${product.discount && "vis"}">${product.discount}%</h4>
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

searchBar.addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();

  const filteredProducts = allProducts.filter((product) => {
    return [
      product.productdisplayname,
      product.brandname,
      product.articletype,
      product.gender,
      product.variantname,
      product.basecolour,
      product.colour1,
      product.discount ? "discount" : "", // Include "discount" if it exists
    ]
      .filter(Boolean) // Removes undefined/null values
      .some((field) => field.toLowerCase().includes(searchTerm)); // Check if any field matches
  });

  showList(filteredProducts);
});
