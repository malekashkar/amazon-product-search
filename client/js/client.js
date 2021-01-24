const form = document.querySelector("form");
const newForm = document.querySelector("#new-form");
const table = document.querySelector("#info-table");
const errorElement = document.querySelector("#error-message");
const loadingElement = document.querySelector(".loading");
const API_URL =
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost"
    ? "http://localhost:3000/"
    : "https://amazon-product-search.herokuapp.com/";

form.style.display = "";
table.style.display = "none";
newForm.style.display = "none";
errorElement.style.display = "none";
loadingElement.style.display = "none";

newForm.addEventListener("click", async (event) => {
  event.preventDefault();

  form.style.display = "";
  newForm.style.display = "none";
  table.style.display = "none";
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const name = formData.get("name");
  const minPrice = Number(formData.get("minPrice"));
  const maxPrice = Number(formData.get("maxPrice"));

  if (name.trim()) {
    errorElement.style.display = "none";
    form.style.display = "none";
    loadingElement.style.display = "";

    const params = new URLSearchParams({
      name,
      minPrice,
      maxPrice,
    });

    const response = await fetch(`${API_URL}search?${params}`);
    const json = await response.json();

    if (response.ok) {
      loadingElement.style.display = "none";
      table.style.display = "";

      const productTitleEl = document.querySelector("#product-title");
      const productURLEl = document.querySelector("#product-url");
      const productStockEl = document.querySelector("#product-stock");
      const productPriceEl = document.querySelector("#product-price");
      const productListPriceEl = document.querySelector("#product-listPrice");
      const productDiscountEl = document.querySelector("#product-discount");
      const productRatingsE1 = document.querySelector("#product-rating");
      const productTotalRatingsE1 = document.querySelector(
        "#product-total-rating"
      );
      const amazonChoiceE1 = document.querySelector("#amazon-choice");

      productTitleEl.innerHTML = json.title
        ? json.title
        : `No title was provided.`;
      productURLEl.innerHTML = `https://amazon.com/dp/${json.asin}`;
      productStockEl.innerHTML = json.stock
        ? json.stock
        : `No stock was provided.`;
      productPriceEl.innerHTML = json.price
        ? `$${json.price}`
        : `No price was provided.`;
      productURLEl.setAttribute("href", `https://amazon.com/dp/${json.asin}`);
      productListPriceEl.innerHTML = json.listPrice
        ? `$${json.listPrice}`
        : `No list price was provided.`;
      productDiscountEl.innerHTML = json.discount
        ? `$${json.discount}`
        : `No discount was provided.`;
      productRatingsE1.innerHTML = json.ratings
        ? `${json.ratings}⭐`
        : `No ratings were provided.`;
      productTotalRatingsE1.innerHTML = json.totalRatings
        ? `${json.totalRatings} ratings`
        : "No total ratings were provided";
      amazonChoiceE1.innerHTML = json.isAmazonChoice
        ? `${json.isAmazonChoice}`
        : "Not provided";

      setTimeout(() => {
        form.reset();
        newForm.style.display = "";
      }, 30 * 1000);
    } else {
      errorElement.textContent = json.message;
      errorElement.style.display = "";

      form.style.display = "";
      loadingElement.style.display = "none";

      setTimeout(() => (errorElement.style.display = "none"), 10 * 1000);
    }
  } else {
    errorElement.textContent = "The name of the product is required!";
    errorElement.style.display = "";

    setTimeout(() => (errorElement.style.display = "none"), 10 * 1000);
  }
});
