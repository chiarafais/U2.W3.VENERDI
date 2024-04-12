const URL = "https://striveschool-api.herokuapp.com/api/product/";
const myToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWI5NzdmMzA0NjAwMWFlNTlmNmQiLCJpYXQiOjE3MTI5MDkyMDcsImV4cCI6MTcxNDExODgwN30.jaiCNT0ncAui1RaVxOeDiyo_e-aZk8IrHcoilHdcBdU";

const deleteProduct = function (id) {
  fetch(URL + id, {
    method: "DELETE",
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
      console.log(products);
      const alert = document.querySelector(".alertContainer");
      alert.innerHTML =
        '<div class="alert alert-success alert-dismissible fade show" role="alert">Eliminazione avvenuta con successo! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>';
      listProduct();
    })
    .catch((err) => console.log(err));
};

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
        divBtn.classList.add("btn-group");

        const button1 = document.createElement("button");
        button1.classList.add("btn", "btn-sm", "btn-outline-secondary");
        button1.innerText = "ELIMINA";
        button1.addEventListener("click", function () {
          deleteProduct(elemento._id);
        });

        const button2 = document.createElement("button");
        button2.classList.add("btn", "btn-sm", "btn-outline-secondary");
        button2.innerText = "MODIFICA";
        button2.addEventListener("click", function () {
          window.location.href = "edit.html?" + elemento._id;
        });

        col.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(h5);
        cardBody.appendChild(cardBrand);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardPrice);
        divBtn.appendChild(button1);
        divBtn.appendChild(button2);
        card.appendChild(divBtn);
        row.appendChild(col);
      });
    })

    .catch((err) => console.log(err));
};
listProduct();

const createProduct = function (query, oggetto) {
  fetch(URL + query, {
    method: "POST",
    body: JSON.stringify(oggetto),
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
      console.log(products);
      var myModalEl = document.querySelector(".modal");
      var modal = bootstrap.Modal.getInstance(myModalEl);
      modal.hide();
      const form = document.querySelector("form");
      form.reset();
      listProduct();
      const alert = document.querySelector(".alertContainer");
      alert.innerHTML =
        '<div class="alert alert-success alert-dismissible fade show" role="alert">Creazione nuovo prodotto avvenuta con successo! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>';
    })
    .catch((err) => console.log(err));
};
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();

          let obj = {
            name: document.querySelector("#validationNomeProdotto").value,
            description: document.querySelector("#validationDescrizione").value,
            brand: document.querySelector("#validationBrand").value,
            imageUrl: document.querySelector("#validationImg").value,
            price: Number(document.querySelector("#validationPrezzo").value),
          };
          createProduct("", obj);
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

const buttonReset = document.querySelector("#resetButton");
buttonReset.addEventListener("click", function () {
  const form = document.querySelector("form");
  form.reset();
});

const buttonHomepage = document.querySelector("#homepage");
buttonHomepage.addEventListener("click", function () {
  window.location.href = "homepage.html";
});
