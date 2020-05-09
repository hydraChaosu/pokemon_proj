const search = document.getElementById("searchInput");
const load = document.getElementById("loadMoreBtn");
const cardsWrapper = document.getElementById("cardsWrapper");
let pageNumber = 1;
let perPage = 4;
let data = [];
let loading = null;

load.addEventListener("click", async (e) => {
  e.preventDefault();
  setData();
});

search.addEventListener("input", (e) => {
  console.log(e.target.value);
  console.log(e);
  cardsWrapper.innerHTML = "";
  let dataCopy;
  if (e.target.value === "") {
    dataCopy = [...data];
  } else {
    dataCopy = [...data].filter(
      (data) => data.name.toLowerCase().indexOf(e.target.value) > -1
    );
  }

  console.log(dataCopy);
  dataCopy.forEach((data) => {
    const element = createElement(data);
    cardsWrapper.appendChild(element);
  });
});

async function getData() {
  try {
    //loader
    loading = true;
    load.innerText = "";
    load.setAttribute("class", "loading");
    load.disabled = true;

    const response = await fetch(
      `https://api.pokemontcg.io/v1/cards?page=${pageNumber}&pageSize=${perPage}`
    );
    pageNumber += 1;
    const { cards } = await response.json();
    loading = false;
    //loaded
    load.disabled = false;
    load.innerText = "Load more";
    load.setAttribute("class", "pokeapp__button--load");
    return cards;
  } catch (error) {
    console.log(error);
  }
}

async function setData() {
  localData = await getData();
  data = await data.concat(localData);
  localData.forEach((data) => {
    const element = createElement(data);
    cardsWrapper.appendChild(element);
  });
}

function insertData() {
  setData();
}

function createElement({ name, imageUrl, supertype, subtype, rarity, number }) {
  const element = document.createElement("div");
  const pokemonHeader = document.createElement("div");
  pokemonHeader.setAttribute("class", "pokeapp__card__pokemon__header");
  const pokemonName = document.createElement("p");
  pokemonName.innerText = name;
  pokemonName.setAttribute("class", "pokeapp__card__pokemon__name");
  const pokemonNumber = document.createElement("p");
  pokemonNumber.innerText = `Nr: ${number}`;
  pokemonNumber.setAttribute("class", "pokeapp__card__pokemon__number");
  pokemonHeader.appendChild(pokemonName);
  pokemonHeader.appendChild(pokemonNumber);
  const pokemonImage = document.createElement("img");
  pokemonImage.setAttribute("src", imageUrl);
  pokemonImage.setAttribute("class", "pokeapp__card__pokemon__image");
  const pokemonSupertype = document.createElement("p");
  pokemonSupertype.innerHTML = `<b>Supertype:</b> ${supertype}`;
  pokemonSupertype.setAttribute("class", "pokeapp__card__pokemon__supertype");
  const pokemonSubtype = document.createElement("p");
  pokemonSubtype.innerHTML = `<b>Subtype:</b> ${subtype}`;
  pokemonSubtype.setAttribute("class", "pokeapp__card__pokemon__subtype");
  const pokemonRarity = document.createElement("p");
  pokemonRarity.innerHTML = `<b>Rarity:</b> ${rarity}`;
  pokemonRarity.setAttribute("class", "pokeapp__card__pokemon__rarity");
  element.setAttribute("class", "card__wrapper");
  element.appendChild(pokemonHeader);
  element.appendChild(pokemonImage);
  element.appendChild(pokemonSupertype);
  element.appendChild(pokemonSubtype);
  element.appendChild(pokemonRarity);
  return element;
}

insertData();
