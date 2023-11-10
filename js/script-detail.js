const params = new URLSearchParams(window.location.search).get("id");
console.log(params);

window.onload = () => {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + params, {
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
      const main = document.querySelector("main");

      const { name, imageUrl, description } = obj;

      main.innerHTML = `
      <div class="row">
        <div class="col-12"><h1 class="text-center">${name}</h1></div>
        <div class="col-12 col-lg-7 "><img src="${imageUrl}" alt="img of product" /></div>
        <div class="col-12 col-lg-5">
          <h3>${description}</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
            voluptate sapiente velit molestias architecto repellendus, harum
            fuga magnam ipsum perferendis fugit totam atque officia distinctio
            nam omnis, eveniet perspiciatis. Rem.
          </p>
          <div class="col-12">
            <a href="${imageUrl}" target="_blank" class="text-center"
              >Vai alla pagina del prodotto</a
            >
          </div>
        </div>
      </div>
      `;
    })
    .catch(error => {
      console.error("Errore:", error);
    });
};
