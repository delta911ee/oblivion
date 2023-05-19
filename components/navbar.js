const navBar = document.createElement("template");

navBar.innerHTML = `
<style>
.container{
  width: 100vw;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navLeft{
  margin-left:50px;
}

.navRight{
  margin-right:50px;
}

.navLeft > .logoText{
  font-family: "K2D", sans-serif;
  letter-spacing: -2px;
  font-size: 50px;
  cursor: pointer;
}

.navRight > .item{
  font-size: 20px;
  font-weight:400;
  text-decoration:none;
}

#home, #browse, #about{
  margin-inline:25px;
}

#support{
  margin-left:25px;
}

</style>
<div class="container">
    <div class="navLeft">
        <h1 class="logoText">OBLIVION</h1>
    </div>
    <div class="navRight">
        <a class="item" id="home" href="../index.html">Home</a>
        <a class="item" id="browse" href="../pages/browse.html">Browse</a>
        <a class="item" id="about" href="../pages/help.html">FAQ</a>
        <a class="item" id="support" href="../pages/donate.html">Support</a>
    </div>
</div>
`;

class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(navBar.content.cloneNode(true));
    let logoText = this.shadowRoot.querySelector(".logoText");
    logoText.setAttribute("style", "color:" + this.getAttribute("logoColor"));
    let items = this.shadowRoot.querySelectorAll(".item");
    items.forEach((item) => {
      item.setAttribute("style", "color:" + this.getAttribute("itemColor"));
      item.addEventListener("mouseover", () => {
        item.setAttribute("style", "color:" + this.getAttribute("hoverColor"));
      });
      item.addEventListener("mouseout", () => {
        item.setAttribute("style", "color:" + this.getAttribute("itemColor"));
      });
    });
    this.shadowRoot.querySelector(".navLeft").addEventListener("click", () => {
      window.open("../index.html", "_self");
    });
  }
}

window.customElements.define("nav-bar", NavBar);
