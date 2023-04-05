import { data } from "../data/main.js";
let contentContainer = document.getElementById("contentContainer");
let contentTitle = document.querySelector(".contentTitle");
let contentType = document.querySelector(".contentType");
let contentGenre = document.querySelector(".contentGenre");
let contentAuthor = document.querySelector(".contentAuthor");
let contentUploadDate = document.querySelector(".contentUploadDate");
let contentHolder = document.querySelector(".contentHolder");

let themeChanger = document.getElementById("themeChanger");
let share = document.getElementById("share");

function getContentId() {
  let url = window.location.href;
  let contentId = url.split("?")[1].split("=")[1];
  return contentId;
}

let contentId = getContentId();

function loadContent() {
  data.forEach((element) => {
    if (element.contentId == contentId) {
      contentTitle.innerText = element.contentName;
      contentType.innerText = element.contentType;
      contentGenre.innerText = element.contentGenre;
      contentAuthor.innerHTML = "By : " + element.contentAuthor;
      contentUploadDate.innerText = "Uploaded : " + element.contentUploadDate;
      contentHolder.innerText = element.contentText;
      if (element.hasOwnProperty("footerInfo")) {
        let i = document.createElement("div");
        i.classList.add("footerInfo");
        i.innerHTML = element.footerInfo;
        contentContainer.appendChild(i);
      }
    }
  });
}

loadContent();

themeChanger.addEventListener("click", () => {
  if (themeChanger.classList.contains("lightToDark")) {
    themeChanger.classList.add("darkToLight");
    themeChanger.classList.remove("lightToDark");
    themeChanger.src = "../assets/sun.png";
    contentContainer.style.color = "white";
    share.src = "../assets/shareWhite.png";
    document.body.style.backgroundColor = "#1e1e1e";
  } else {
    themeChanger.classList.remove("darkToLight");
    themeChanger.classList.add("lightToDark");
    themeChanger.src = "../assets/moon.png";
    contentContainer.style.color = "black";
    share.src = "../assets/shareBlack.png";
    document.body.style.backgroundColor = "white";
  }
});

share.addEventListener("click", () => {
  navigator.clipboard.writeText(window.location.href);
  window.alert("Link copied to clipboard!");
});
