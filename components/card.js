import { COLORS } from "../assets/colors.js";

const card = document.createElement("template");

card.innerHTML = `

<style>
.cardContainer{
    width:250px;
    height:250px;
    cursor:pointer;
    border-radius:10px;
    transition:0.4s ease;
}

.cardContainer:hover{
  box-shadow: rgba(0,0,0,0.7) 0px 7px 29px 0px;
}

</style>

<div class="cardContainer">
</div>

`;

class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(card.content.cloneNode(true));
    setTimeout(() => {
      this.shadowRoot
        .querySelector(".cardContainer")
        .setAttribute(
          "style",
          "background-image: url(" + this.getAttribute("contentImage") + ")"
        );
    }, 10);
    this.shadowRoot
      .querySelector(".cardContainer")
      .addEventListener("click", () => {
        let cId = this.getAttribute("contentId");
        window.open("../pages/viewer.html?cId=" + cId, "_self");
      });
  }
}

window.customElements.define("custom-card", Card);
