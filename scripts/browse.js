import { data } from "../data/main.js";
import { recentIds } from "../data/recent.js";

let searchContainer = document.getElementById("searchContainer");
let searchBox = document.getElementById("searchBox");
let searchButton = document.getElementById("searchButton");
let searchQueryText = document.getElementById("searchQueryText");
let results = document.getElementById("results");

let genres = [];

data.forEach((item) => {
  genres.push(item.contentGenre.toLowerCase());
});

function clearAllResults() {
  while (results.firstChild) {
    results.removeChild(results.firstChild);
  }
}

function gridToFlex() {
  results.classList.remove("grid");
  results.classList.add("flex");
}

function flexToGrid() {
  results.classList.remove("flex");
  results.classList.add("grid");
}

function renderRecent() {
  searchQueryText.innerText = "Recent";
  clearAllResults();
  flexToGrid();
  recentIds.forEach((item) => {
    let card = document.createElement("custom-card");
    card.setAttribute("contentId", item.contentId);
    card.setAttribute("contentImage", item.contentImage);
    results.appendChild(card);
  });
}

function renderNoContent() {
  gridToFlex();
  clearAllResults();
  let d = document.createElement("div");
  d.classList.add("noContent");
  d.innerText = "Sorry, No results were found for this search query.";
  results.appendChild(d);
}

function renderByGenre(t) {
  flexToGrid();
  clearAllResults();
  data.forEach((item) => {
    if (item.contentGenre.toLowerCase() == t.toLowerCase()) {
      let card = document.createElement("custom-card");
      card.setAttribute("contentId", item.contentId);
      card.setAttribute("contentImage", item.contentImage);
      results.appendChild(card);
    }
  });
}

function fetchCards() {
  clearAllResults();
  let searchQuery = searchBox.value;
  searchQueryText.innerText = "Results for : " + searchQuery;
  genres.forEach((item) => {
    if (item == searchQuery.toLowerCase()) {
      renderByGenre(searchQuery);
    }
  });
  let e = results.childNodes;
  if (e.length == 0) {
    renderNoContent();
  }
}

searchButton.addEventListener("click", () => {
  if (searchBox.value == "") {
    renderRecent();
  } else {
    fetchCards();
  }
});

window.addEventListener("keydown", (e) => {
  if (
    e.key == "Enter" &&
    document.activeElement === searchBox &&
    searchBox.value != ""
  ) {
    fetchCards();
  } else if (
    e.key == "Enter" &&
    document.activeElement === searchBox &&
    searchBox.value == ""
  ) {
    renderRecent();
  }
});

window.addEventListener("load", renderRecent);
