import { recentIds } from "../data/recent.js";

let browseButton = document.querySelector(".browse");
browseButton.addEventListener("click", () => {
  window.open("pages/browse.html", "_self");
});

let imgs = document.querySelectorAll(".recents");

for (let i = 0; i <= imgs.length; i++) {
  imgs[i].src = recentIds[i].contentImage;
  imgs[i].addEventListener("click", () => {
    window.open("../pages/viewer.html?cid=" + recentIds[i].contentId);
  });
}
