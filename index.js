const category_list_container = document.querySelector(".category_list_container");
fetch(`https://kea-alt-del.dk/t7/api/categories/`)
  .then((response) => response.json())
  .then((data) => showCategory(data));

function showCategory(categories) {
  console.log(categories);
  const markup = categories.map((category) => {
    return `<a href="produktliste.html?category=${category.category}">
    ${category.category}
</a>
`;
  });
  category_list_container.innerHTML = markup.join("");
  //   console.log(string);
}

//opretter ny URL
// const myCategory = new URLSearchParams(window.location.search).get("category");

// console.log("category", myCategory);

// document.querySelector("a").textContent = `${myCategory}`;
