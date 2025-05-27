const form = document.querySelector(".busca-filme");
const inputName = document.querySelector("#movieName");
const divMovie = document.querySelector(".movie");
const avisos = document.querySelector("form p");

const getDados = async (nome) => {
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?t=${nome}&apikey=753c814e`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  avisos.innerHTML = "";
  divMovie.style.display = "none";
  divMovie.style.width = "0";

  avisos.innerHTML = "Carregando...";

  const nome = inputName.value.toLowerCase();
  const movie = await getDados(nome);
  console.log(movie);
  addInfos(movie);
  inputName.value = "";
});

function verifica(obj, key) {
  return obj[key] && obj[key] !== "N/A" ? obj[key] : `Não possui ${key}`;
}

function addInfos(data) {
  avisos.innerHTML = "";
  if (data.Response === "False") {
    avisos.innerHTML = '<span class="erro">*Filme não encontrado*</span>';
    return;
  }

  divMovie.style.display = "flex";
  divMovie.style.width = "25vw";
  divMovie.innerHTML = `<img class="poster"  style="display: ${
    verifica(data, "Poster") === "Não possui Poster" ? "none" : "block"
  };"
           src="${
             verifica(data, "Poster") === "Não possui Poster"
               ? "./Assets/sem-imagem.jpg"
               : verifica(data, "Poster")
           }"
            alt="${verifica(data, "Title")} poster">
        <h2 class="title">${verifica(data, "Title")}</h2>
        <div class="info">
            <p><span>Lançamento:</span> ${verifica(data, "Released")} </p>
            <p><span>Gêneros:</span> ${verifica(data, "Genre")} </p>
            <p><span>Duração:</span> ${verifica(data, "Runtime")} </p>
        </div>`;
}
inputName.addEventListener("keyup", (e) => {
  if (inputName.value == "") {
    divMovie.style.display = "none";
    avisos.innerHTML = "";
  }
});
