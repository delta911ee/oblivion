const qaBar = document.createElement("template");

qaBar.innerHTML = `
<style>
.parent{
    width:70vw;
    height:30vh;
    color:white;
    font-size:25px;
    margin-bottom:100px;
}
.question{
    background-color:#292929;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
}

.answer{
    background-color:gray;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}

.question, .answer{
    width:70vw;
    min-height:15vh;
    font-size:25px;
    height:fit-content;
    padding:10px;
    display:flex;
    justify-content:center;
    align-items:center;
}

a{
    font-size:inherit;
    text-decoration:none;
    color:#440fda;
}

@media screen and (max-width:700px){
  .question, .answer{
    font-size:20px;
  }
}

@media screen and (max-width:480px){
  .question, .answer{
    font-size:15px;
  }
}

</style>

<div class="parent">
<div class="question"></div>
<div class="answer"></div>
</div>
`;

class QABar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(qaBar.content.cloneNode(true));
    this.shadowRoot.querySelector(".question").innerHTML =
      this.getAttribute("question");
    this.shadowRoot.querySelector(".answer").innerHTML =
      this.getAttribute("answer");
  }
}

window.customElements.define("qa-bar", QABar);
