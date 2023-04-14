import { data } from "../data/main.js";
import { recentIds } from "../data/recent.js";

let tabButtons = document.querySelectorAll(".tabButton");
let searchText = document.getElementById("searchText");
let resultBox = document.getElementById("resultBox");
let searchBox = document.getElementById("searchBox");
let searchButton = document.getElementById("searchButton");

function popLast(s) {
  let l = s.split("");
  if (l.includes("s") || l.includes("S")) {
    l.pop();
    let newS = "";
    l.forEach((e) => {
      newS += e;
    });
    return newS;
  } else {
    return "";
  }
}

function renderCards(t) {
  clearAllResults();
  data.forEach((item) => {
    let words = item.contentDescription.split(" ");
    let inputWords = // very bad code. Optimize later.
      (
        t +
        " " +
        t.toLowerCase() +
        " " +
        t.charAt(0).toLowerCase() +
        t.slice(1) +
        " " +
        t +
        "s" +
        " " +
        t.toUpperCase() +
        " " +
        t.charAt(0).toUpperCase() +
        t.slice(1) +
        " " +
        popLast(t)
      ).split(" ");
    let intersection = words.filter((x) => inputWords.includes(x));
    if (intersection.length >= 1) {
      let card = document.createElement("custom-card");
      card.setAttribute("contentId", item.contentId);
      card.setAttribute("contentImage", item.contentImage);
      resultBox.appendChild(card);
    }
    let e = resultBox.childNodes;
    if (e.length == 0) {
      searchText.innerText = "No results were found for this query.";
    } else {
      searchText.innerText = e.length.toString() + " Results for " + t;
    }
  });
}

searchButton.addEventListener("click", () => {
  if (searchBox.value == "") {
    setActive(tabButtons[0]);
  } else {
    fetchCards();
  }
});

function fetchCards() {
  clearAllResults();
  let searchQuery = searchBox.value;
  renderCards(searchQuery);
}

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
    setActive(tabButtons[0]);
  }
});

function clearAllResults() {
  while (resultBox.firstChild) {
    resultBox.removeChild(resultBox.firstChild);
  }
}

function renderAll() {
  clearAllResults();
  searchText.innerText = "All (" + data.length + ")";
  data.forEach((item) => {
    let card = document.createElement("custom-card");
    card.setAttribute("contentId", item.contentId);
    card.setAttribute("contentImage", item.contentImage);
    resultBox.appendChild(card);
  });
}

function renderRecent() {
  let i = 0;
  clearAllResults();
  recentIds.forEach((item) => {
    let card = document.createElement("custom-card");
    card.setAttribute("contentId", item.contentId);
    card.setAttribute("contentImage", item.contentImage);
    resultBox.appendChild(card);
    i += 1;
  });
  searchText.innerText = "Recent (" + i + ")";
}

function renderStories() {
  let i = 0;
  clearAllResults();
  data.forEach((item) => {
    if (item.contentType == "Short story" || item.contentType == "Chat story") {
      let card = document.createElement("custom-card");
      card.setAttribute("contentId", item.contentId);
      card.setAttribute("contentImage", item.contentImage);
      resultBox.appendChild(card);
      i += 1;
    }
  });
  searchText.innerText = "Stories (" + i + ")";
}

function renderPoems() {
  let i = 0;
  clearAllResults();
  data.forEach((item) => {
    if (item.contentType == "Poem") {
      let card = document.createElement("custom-card");
      card.setAttribute("contentId", item.contentId);
      card.setAttribute("contentImage", item.contentImage);
      resultBox.appendChild(card);
      i += 1;
    }
  });
  searchText.innerText = "Poems (" + i + ")";
}

function renderTbContent(tb) {
  let t = tb.innerText;
  if (t == "All") {
    renderAll();
  } else if (t == "Recent") {
    renderRecent();
  } else if (t == "Stories") {
    renderStories();
  } else if (t == "Poems") {
    renderPoems();
  }
}

function setActive(tb) {
  tabButtons.forEach((btn) => {
    btn.classList.remove("active");
  });
  tb.classList.add("active");
  renderTbContent(tb);
}

window.addEventListener("load", () => {
  tabButtons[0].classList.add("active");
  renderAll();
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActive(btn);
    });
  });
});
