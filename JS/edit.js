const URL = "https://striveschool-api.herokuapp.com/api/product/";
const myToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWI5NzdmMzA0NjAwMWFlNTlmNmQiLCJpYXQiOjE3MTI5MDkyMDcsImV4cCI6MTcxNDExODgwN30.jaiCNT0ncAui1RaVxOeDiyo_e-aZk8IrHcoilHdcBdU";

const indietro = document.querySelector("#indietro");
indietro.addEventListener("click", function () {
  window.location.href = "index.html";
});

const population = function () {
  let id = window.location.search.substring(1);
  console.log(id);
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
      document.querySelector("#validationNomeProdotto").value = product.name;
      document.querySelector("#validationDescrizione").value =
        product.description;
      document.querySelector("#validationBrand").value = product.brand;
      document.querySelector("#validationImg").value = product.imageUrl;
      document.querySelector("#validationPrezzo").value = product.price;
    })

    .catch((err) => console.log(err));
};
population();

const editProduct = function (oggetto) {
  let id = window.location.search.substring(1);
  fetch(URL + id, {
    method: "PUT",
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
      const alert = document.querySelector(".alertContainer");
      alert.innerHTML =
        '<div class="alert alert-success alert-dismissible fade show" role="alert">Modifica avvenuta con successo! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>';
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
          editProduct(obj);
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
