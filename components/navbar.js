import { COLORS } from "../assets/colors.js";

const navBar = document.createElement("template");

navBar.innerHTML = `
<style>
.container{
    width:100vw;
    height:15vh;
    display:flex;
    justify-content:space-between;
    align-items:center;
}

.navLeft{
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    margin-left:2vw;
    cursor:pointer;
}

.oblivionLogo{
    width:50px;
    height:50px;
    margin:10px;
}

.logoText{
    font-size:40px;
    margin:5x;
    font-weight:800;
    transition:0.2s ease;
}

.navRight{
    display:flex;
    justify-content:center;
    align-items:center;
    margin-right:2vw;
}

.item{
    font-size:20px;
    padding:20px;
    font-weight:600;
    cursor:pointer;
    transition:0.2s ease;
    text-decoration:none;
}

@media screen and (max-width:700px){
  .container{
    flex-direction:column;
  }
}

@media screen and (max-width:480px){
  .logoText{
    font-size:35px;
  }
  .oblivionLogo{
    width:45px;
    height:45px;
  }
  .item{
    font-size:15px;
  }
}

@media screen and (max-width:320px){
  .item{
    padding:10px;
  }
  .oblivionLogo{
    width:35px;
    height:35px;
  }
  .logoText{
    font-size:30px;
  }
}

</style>
<div class="container">
    <div class="navLeft">
        <img class="oblivionLogo" src="../assets/logo.svg"></img>
        <h1 class="logoText">Oblivion</h1>
    </div>
    <div class="navRight">
        <a class="item" id="home" href="../home.html">Home</a>
        <a class="item" id="browse" href="../pages/browse.html">Browse</a>
        <a class="item" id="about" href="../pages/help.html">Help</a>
        <a class="item" id="support" href="../pages/donate.html">Donate</a>
    </div>
</div>
`;

class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(navBar.content.cloneNode(true));
    let items = this.shadowRoot.querySelectorAll(".item");
    items.forEach((item) => {
      item.setAttribute("style", "color:" + this.getAttribute("color"));
      item.addEventListener("mouseover", () => {
        item.setAttribute("style", "color:" + COLORS.logoBg);
      });
      item.addEventListener("mouseout", () => {
        item.setAttribute("style", "color:" + this.getAttribute("color"));
      });
    });
    this.shadowRoot.querySelector(".navLeft").addEventListener("click", () => {
      window.open("../home.html", "_self");
    });
  }
}

window.customElements.define("nav-bar", NavBar);
