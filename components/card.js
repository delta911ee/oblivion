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

.skeleton{
  background-color:#949494;
  animation: skeleton 0.5s linear infinite alternate;
}

@keyframes skeleton{
  50%{
    background-color:#949494;
  }
  100%{
    background-color:#595959;
  }
}

.cardContainer:hover{
  box-shadow: rgba(0,0,0,0.7) 0px 7px 29px 0px;
}

</style>

<img class="cardContainer skeleton">

`;

class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(card.content.cloneNode(true));
    setTimeout(() => {
      this.shadowRoot.querySelector(".cardContainer").src =
        this.getAttribute("contentImage");
    }, 10);
    this.shadowRoot
      .querySelector(".cardContainer")
      .addEventListener("click", () => {
        let cId = this.getAttribute("contentId");
        window.open("../pages/viewer.html?cId=" + cId, "_self");
      });
    this.shadowRoot
      .querySelector(".cardContainer")
      .addEventListener("load", () => {
        this.shadowRoot
          .querySelector(".cardContainer")
          .classList.remove("skeleton");
      });
  }
}

window.customElements.define("custom-card", Card);
