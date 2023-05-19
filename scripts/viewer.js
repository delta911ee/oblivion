import { data } from "../data/main.js";

let navBar = document.getElementById("nav");
let contentContainer = document.getElementById("contentContainer");
let contentInfoAndOps = document.getElementById("contentInfoAndOps");
let contentTitle = document.querySelector(".contentTitle");
let contentType = document.querySelector(".contentType");
let contentGenre = document.querySelector(".contentGenre");
let contentAuthor = document.querySelector(".contentAuthor");
let contentUploadDate = document.querySelector(".contentUploadDate");
let contentHolder = document.getElementById("contentHolder");

let themeChanger = document.getElementById("themeChanger");
let share = document.getElementById("share");

// Special elements for chat story viewer.

let topHeader;
let goBack;
let cName;
let hide;
let chatContainer;
let hidden = false;
let messageIndex = 0;

// End of special elements

function getContentId() {
  let url = window.location.href;
  let contentId = url.split("?")[1].split("=")[1];
  return contentId;
}

let contentId = getContentId();

// Specific to chat stories.

function endOfStory() {
  console.log("The End");
}

function renderMessage(chatStoryObject) {
  let messageList = chatStoryObject.contentText;
  let messagePacket;
  if (messageList[messageIndex] == null) {
    endOfStory();
  } else {
    messagePacket = messageList[messageIndex].split("||");
    if (messagePacket[0] == "S" && messagePacket[1].split("")[0] != "<") {
      let senderBubble = document.createElement("div");
      senderBubble.classList.add("senderBubble");
      let senderName = document.createElement("p");
      senderName.innerText = chatStoryObject.sName;
      senderName.classList.add("userName");
      senderBubble.appendChild(senderName);
      let senderText = document.createElement("p");
      senderText.innerText = messagePacket[1];
      senderBubble.appendChild(senderText);
      chatContainer.appendChild(senderBubble);
      senderBubble.style.marginLeft =
        "calc(98vw - " +
        window.getComputedStyle(senderBubble).getPropertyValue("width") +
        " - 40px)";
    } else if (
      messagePacket[0] == "R" &&
      messagePacket[1].split("")[0] != "<"
    ) {
      let recieverBubble = document.createElement("div");
      recieverBubble.classList.add("recieverBubble");
      let recieverName = document.createElement("p");
      recieverName.innerText = chatStoryObject.rName;
      recieverName.classList.add("userName");
      recieverBubble.appendChild(recieverName);
      let recieverText = document.createElement("p");
      recieverText.innerText = messagePacket[1];
      recieverBubble.appendChild(recieverText);
      chatContainer.appendChild(recieverBubble);
    } else if (
      messagePacket[0] == "R" &&
      messagePacket[1].split("")[0] == "<"
    ) {
      let recieverImage = document.createElement("img");
      recieverImage.src = messagePacket[1].split(">")[1];
      recieverImage.classList.add("recieverImage");
      chatContainer.appendChild(recieverImage);
    } else if (
      messagePacket[0] == "S" &&
      messagePacket[1].split("")[0] == "<"
    ) {
      let senderImage = document.createElement("img");
      senderImage.src = messagePacket[1].split(">")[1];
      senderImage.classList.add("senderImage");
      chatContainer.appendChild(senderImage);
      senderImage.style.marginLeft =
        "calc(98vw - " +
        window.getComputedStyle(senderImage).getPropertyValue("width") +
        ")";
    }
  }
}

function viewUnviewTopHeader() {
  if (!hidden) {
    topHeader.style.display = "none";
    chatContainer.style.height = "100vh";
    hidden = true;
  } else {
    topHeader.style.display = "flex";
    chatContainer.style.height = "90vh";
    hidden = false;
  }
}

function initChatStory(chatStoryObject) {
  navBar.style.display = "none";
  contentInfoAndOps.style.display = "none";
  contentContainer.style.width = "100vw";
  contentContainer.style.height = "100vh";
  contentContainer.style.justifyContent = "flex-start";
  contentHolder.style.display = "none";
  chatContainer = document.createElement("div");
  chatContainer.classList.add("chatContainer");
  contentContainer.appendChild(chatContainer);
  topHeader = document.createElement("div");
  topHeader.classList.add("topHeader");
  contentContainer.appendChild(topHeader);
  window.addEventListener("keypress", (e) => {
    if (e.key == "x" || e.key == "X") {
      viewUnviewTopHeader();
    }
  });
  window.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      renderMessage(chatStoryObject);
      messageIndex++;
    }
  });
}

// End of chat story specific functions.

function loadContent() {
  data.forEach((element) => {
    if (element.contentId == contentId) {
      if (element.contentType == "Chat story") {
        initChatStory(element);
      } else {
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
