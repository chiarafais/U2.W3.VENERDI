const URL = "https://striveschool-api.herokuapp.com/api/product/";
const myToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWI5NzdmMzA0NjAwMWFlNTlmNmQiLCJpYXQiOjE3MTI5MDkyMDcsImV4cCI6MTcxNDExODgwN30.jaiCNT0ncAui1RaVxOeDiyo_e-aZk8IrHcoilHdcBdU";

const listProduct = function () {
  fetch(URL, {
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
    .then((products) => {
      const row = document.querySelector(".products");
      row.innerHTML = "";

      products.forEach((elemento) => {
        const col = document.createElement("col");
        col.classList.add("col", "col-md-3", "mb-4");

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = elemento.imageUrl;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.innerText = elemento.name;

        const cardBrand = document.createElement("h6");
        cardBrand.classList.add("card-brand");
        cardBrand.innerText = elemento.brand;

        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.innerText = elemento.description;

        const cardPrice = document.createElement("span");
        cardPrice.classList.add("badge", "rounded-pill", "text-bg-primary");
        cardPrice.innerText = "€ " + elemento.price;

        const divBtn = document.createElement("div");
        divBtn.classList.add("d-flex", "flex-column");

        const button1 = document.createElement("button");
        button1.classList.add("btn", "btn-sm", "btn-primary");
        button1.innerText = "SCOPRI DI PIÙ";
        button1.addEventListener("click", function () {
          window.location.href = "detail.html?" + elemento._id;
        });

        const button2 = document.createElement("button");
        button2.classList.add("btn", "btn-sm", "btn-secondary", "mb-3");
        button2.innerText = "MODIFICA";
        button2.addEventListener("click", function () {
          window.location.href = "index.html";
        });

        col.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(h5);
        cardBody.appendChild(cardBrand);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardPrice);
        divBtn.appendChild(button2);
        divBtn.appendChild(button1);
        card.appendChild(divBtn);
        row.appendChild(col);
      });
    })

    .catch((err) => console.log(err));
};
listProduct();
