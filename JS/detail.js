const URL = "https://striveschool-api.herokuapp.com/api/product/";
const myToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWI5NzdmMzA0NjAwMWFlNTlmNmQiLCJpYXQiOjE3MTI5MDkyMDcsImV4cCI6MTcxNDExODgwN30.jaiCNT0ncAui1RaVxOeDiyo_e-aZk8IrHcoilHdcBdU";

const detailProduct = function () {
  let id = window.location.search.substring(1);
  fetch(URL + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: myToken,
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nella fetch");
      }
    })
    .then((product) => {
      const container = document.querySelector(".container");

      const img = document.createElement("img");
      img.classList.add("img");
      img.src = product.imageUrl;

      const div = document.createElement("div");
      div.classList.add("details-product");

      const h2 = document.createElement("h2");
      h2.classList.add("deteils-title");
      h2.innerText = product.name;

      const h4 = document.createElement("h4");
      h4.classList.add("deteils-brand");
      h4.innerText = product.brand;

      const p = document.createElement("p");
      p.classList.add("deteils-description");
      p.innerText = product.description;

      const cardPrice = document.createElement("span");
      cardPrice.classList.add("badge", "rounded-pill", "text-bg-primary");
      cardPrice.innerText = "€ " + product.price;

      container.appendChild(img);
      container.appendChild(div);
      div.appendChild(h2);
      div.appendChild(h4);
      div.appendChild(p);
      div.appendChild(cardPrice);
    })
    .catch((err) => console.log(err));
};
detailProduct();
const indietro = document.querySelector("#homepage");
indietro.addEventListener("click", function () {
  window.location.href = "homepage.html";
});
