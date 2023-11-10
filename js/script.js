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

  const url = "https://striveschool-api.herokuapp.com/api/product/";

  newProductBtn.addEventListener("onsubmit", event => {
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
      return resp.json();
    })
    .then(createdObj => {
      console.log(createdObj);
    })
    .catch(error => console.log(error));
};
