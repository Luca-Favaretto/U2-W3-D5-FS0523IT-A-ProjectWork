window.onload = () => {
  const name = document.getElementById("name");
  console.log(name);
  const descripretion = document.getElementById("descripretion");
  console.log(descripretion);
  const urlProduct = document.getElementById("url");
  console.log(urlProduct);
  const price = document.getElementById("price");
  console.log(price);
  const brand = document.getElementById("brand");
  console.log(brand);
  const newProductBtn = document.getElementById("newProductBtn");
  console.log(newProductBtn);
  const modBtn = document.getElementById("modBtn");
  console.log(modBtn);
  const deleteBtn = document.getElementById("deleteBtn");
  console.log(deleteBtn);

  const params = new URLSearchParams(window.location.search).get("id");
  console.log(params);
  const url = "https://striveschool-api.herokuapp.com/api/product/";

  if (params) {
    fillForm(url, params);
    modBtn.classList.remove("d-none");
    deleteBtn.classList.remove("d-none");
  }

  newProductBtn.addEventListener("click", event => {
    postFetch(
      url,
      {
        name: name.value,
        description: descripretion.value,
        imageUrl: urlProduct.value,
        price: parseFloat(price.value),
        brand: brand.value
      },
      event
    );
  });
  modBtn.addEventListener("click", event => {
    putFetch(
      url,
      {
        name: name.value,
        description: descripretion.value,
        imageUrl: urlProduct.value,
        price: parseFloat(price.value),
        brand: brand.value
      },
      event
    );
  });

  deleteBtn.addEventListener("click", event => {
    deleteFetch(url, params, event);
  });
};

const fillForm = function (url, params, event) {
  fetch(url + params, {
    method: "GET",
    headers: {
      Authorization:
        "   Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWFmYjI1NGU4ODAwMTgzZjE4NzUiLCJpYXQiOjE2OTk2MDUyNDMsImV4cCI6MTcwMDgxNDg0M30.h1hbdEiCDdtbq3pWxdums0TOKskGalhH_Q3DC2dgorI",
      "Content-Type": "application/json"
    }
  })
    .then(resp => {
      if (!resp.ok) {
        if (resp.status === 400) {
          throw new Error("Richiesta non valida");
        }
        if (resp.status === 401) {
          throw new Error("Non autorizzato");
        }
        if (resp.status === 403) {
          throw new Error("Vietato");
        }
        if (resp.status === 404) {
          throw new Error("Non trovato");
        }
        throw new Error("Errore generico durante il recupero");
      }
      return resp.json();
    })
    .then(obj => {
      console.log(obj);

      const { name, description, imageUrl, price, brand } = obj;

      document.getElementById("name").value = name;
      document.getElementById("descripretion").value = description;
      document.getElementById("url").value = imageUrl;
      document.getElementById("price").value = price;
      document.getElementById("brand").value = brand;
    })
    .catch(error => {
      console.error("Errore:", error);
    });
};

const putFetch = function (url, newProduct, event) {
  event.preventDefault();
  console.log("PUT fetch");
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(newProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWFmYjI1NGU4ODAwMTgzZjE4NzUiLCJpYXQiOjE2OTk2MDUyNDMsImV4cCI6MTcwMDgxNDg0M30.h1hbdEiCDdtbq3pWxdums0TOKskGalhH_Q3DC2dgorI",
      "Content-Type": "application/json"
    }
  })
    .then(resp => {
      if (!resp.ok) {
        if (resp.status === 400) {
          throw new Error("Bad Request");
        }
        if (resp.status === 401) {
          throw new Error("Unauthorized");
        }
        if (resp.status === 403) {
          throw new Error("Forbidden");
        }
        if (resp.status === 404) {
          throw new Error("Not found");
        }

        throw new Error("Generic Fetching error");
      }
      console.log(resp);
      return resp.json();
    })
    .then(createdObj => {
      console.log(createdObj);
    })
    .catch(error => console.log(error));
};

const postFetch = function (url, newProduct, event) {
  event.preventDefault();
  console.log("POST fetch");
  fetch(url, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWFmYjI1NGU4ODAwMTgzZjE4NzUiLCJpYXQiOjE2OTk2MDUyNDMsImV4cCI6MTcwMDgxNDg0M30.h1hbdEiCDdtbq3pWxdums0TOKskGalhH_Q3DC2dgorI",
      "Content-Type": "application/json"
    }
  })
    .then(resp => {
      if (!resp.ok) {
        if (resp.status === 400) {
          throw new Error("Bad Request");
        }
        if (resp.status === 401) {
          throw new Error("Unauthorized");
        }
        if (resp.status === 403) {
          throw new Error("Forbidden");
        }
        if (resp.status === 404) {
          throw new Error("Not found");
        }

        throw new Error("Generic Fetching error");
      }
      console.log(resp);
      console.log(resp);
      console.log("hai appena creato un nuovo prodotto");
      document.getElementById("name").value = "";
      document.getElementById("descripretion").value = "";
      document.getElementById("url").value = "";
      document.getElementById("price").value = "";
      document.getElementById("brand").value = "";

      return resp.json();
    })
    .then(createdObj => {
      console.log(createdObj);
    })
    .catch(error => console.log(error));
};

const deleteFetch = function (url, _id, event) {
  console.log("PUT fetch");
  fetch(url + _id, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWFmYjI1NGU4ODAwMTgzZjE4NzUiLCJpYXQiOjE2OTk2MDUyNDMsImV4cCI6MTcwMDgxNDg0M30.h1hbdEiCDdtbq3pWxdums0TOKskGalhH_Q3DC2dgorI",
      "Content-Type": "application/json"
    }
  })
    .then(resp => {
      if (!resp.ok) {
        if (resp.status === 400) {
          throw new Error("Bad Request");
        }
        if (resp.status === 401) {
          throw new Error("Unauthorized");
        }
        if (resp.status === 403) {
          throw new Error("Forbidden");
        }
        if (resp.status === 404) {
          throw new Error("Not found");
        }

        throw new Error("Generic Fetching error");
      }
      console.log(resp);
      return resp.json();
    })
    .then(createdObj => {
      console.log(createdObj);
    })
    .catch(error => console.log(error));
};
