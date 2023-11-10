window.onload = () => {
  getFetch();
};
let url = "https://striveschool-api.herokuapp.com/api/product/";
const getFetch = function () {
  fetch(url, {
    method: "GET",
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
    .then(objArr => {
      console.log(objArr);
      const cardContainer = document.getElementById("card-container");
      cardContainer.innerHTML = "";
      objArr
        .splice(0, 9)
        .forEach(({ imageUrl, name, description, _id, price }) => {
          const col = document.createElement("div");
          col.classList = "col-12 col-md-4 col-lg-3 p-2";
          const card = document.createElement("div");
          card.classList = "card mb-4 shadow-sm ";

          card.innerHTML = `
        <img src="${imageUrl}" class="card-img-top" alt="img-prodotto">`;
          const cardBody = document.createElement("div");
          cardBody.classList = "card-body";
          cardBody.innerHTML = `<h5 class="card-title">${name}</h5>
           <p class="card-text">${description}</p>
           <p class="card-text">${price}</p>
           `;
          const divBody = document.createElement("div");
          divBody.classList =
            "d-flex justify-content-between align-items-center";
          const divInsideBody = document.createElement("div");
          divInsideBody.classList = "btn-group";
          const viewBtn = document.createElement("button");
          viewBtn.classList = "btn btn-sm btn-outline-secondary";
          viewBtn.innerText = "View";
          viewBtn.onclick = () => {
            window.location.href = "./productDetail.html?id=" + _id;
          };
          const modBtn = document.createElement("button");
          modBtn.classList = "btn btn-sm btn-outline-secondary";
          modBtn.innerText = "Modifica";
          modBtn.onclick = () => {
            window.location.href = "./backoffice.html?id=" + _id;
          };

          const deleteBtn = document.createElement("button");
          deleteBtn.classList = "btn btn-sm btn-outline-secondary";
          deleteBtn.innerText = "Delete";

          deleteBtn.onclick = () => {
            col.remove();
            deleteFetch(url, _id);
          };

          divInsideBody.appendChild(viewBtn);
          divInsideBody.appendChild(modBtn);
          divInsideBody.appendChild(deleteBtn);
          divBody.appendChild(divInsideBody);
          cardBody.appendChild(divBody);
          card.appendChild(cardBody);
          col.appendChild(card);
          cardContainer.appendChild(col);
        });
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
