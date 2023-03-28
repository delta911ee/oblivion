import { data } from "../data/main.js";
let contentContainer = document.querySelector(".contentContainer");
let contentTitle = document.querySelector(".contentTitle");
let contentType = document.querySelector(".contentType");
let contentGenre = document.querySelector(".contentGenre");
let contentAuthor = document.querySelector(".contentAuthor");
let contentUploadDate = document.querySelector(".contentUploadDate");
let contentHolder = document.querySelector(".contentHolder");

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
      contentAuthor.innerText = "By : " + element.contentAuthor;
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
