const DOMHelper = function(){
  this.interval     = null;
  this.counter      = 0;
  this.arrayOfWords = [];
}


DOMHelper.prototype.createSelectOptions = function(selectId, arrayForOptions){
  const select = document.getElementById(selectId);
  select.options.length = 0;
  arrayForOptions.forEach(function(element){
    let option        = document.createElement("option");
    option.value      = element.value;
    option.innerText  = element.label;
    select.appendChild(option);
  });
}



DOMHelper.prototype.addEventListenerOnChangeSelectOriginOrDestination = function(selectId, searchInputId){
  const select = document.getElementById(selectId);
  select.addEventListener("change", function(){
    this.setSelectSize(selectId, 1);
    document.getElementById(searchInputId).value = "";
  }.bind(this))
}

DOMHelper.prototype.setSelectSize = function(selectId, size){
  const select  = document.getElementById(selectId);
  select.size   = size;
}



DOMHelper.prototype.checkboxToggleVisibility = function(checkbox_id, elementA_id, elementB_id)
{
  let checkbox = document.getElementById(checkbox_id);
  let elementA = document.getElementById(elementA_id);
  let elementB = document.getElementById(elementB_id);

  if(checkbox.checked){
    elementA.style.visibility = "collapse";
    elementA.style.display    = "none";
    elementB.style.visibility = "visible";
    elementB.style.display    = "block";
  }
  else
  {
    elementA.style.visibility = "visible";
    elementA.style.display    = "block";
    elementB.style.visibility = "collapse";
    elementB.style.display    = "none";
  }
}


DOMHelper.prototype.changeDisplay = function(elementId, isDisplayed)
{
  if(isDisplayed)
  {
    document.getElementById(elementId).style.visibility = "visible";
    document.getElementById(elementId).style.display    = "block";
  }
  else
  {
    document.getElementById(elementId).style.visibility = "collapse";
    document.getElementById(elementId).style.display    = "none";
  }
}



DOMHelper.prototype.innerText = function(elementId, text){
  document.getElementById(elementId).innerText = text;
}


DOMHelper.prototype.createImageElement = function(imageName, className){
  let image = document.createElement("img");
  image.src = `./images/${imageName}`;

  if(className != null && className != undefined){
    image.className = className;
  }

  return image;
}

DOMHelper.prototype.createImageElementWithSrc = function(createImageElementWithSrc, className){
  let image = document.createElement("img");
  image.src = createImageElementWithSrc;

  if(className != null && className != undefined){
    image.className = className;
  }

  return image;
}


DOMHelper.prototype.createDivElement = function(className){
  let div = document.createElement("div");

  if(className != null && className != undefined){
    div.className = className;
  }
  return div;
}

DOMHelper.prototype.createButtonElement = function(className, label){
  let button = document.createElement("button");

  if(className != null && className != undefined){
    button.className = className;
  }

  if(label != null && label != undefined){
    button.innerText = label;
  }

  return button;
}

DOMHelper.prototype.createSpan = function(className, text){
  let span = document.createElement("span");

  if(className != null && className != undefined){
    span.className = className;
  }

  if(text != null && text != undefined){
    span.innerText = text;
  }

  return span;
}

DOMHelper.prototype.createParagraphe = function(className, text){
  let p = document.createElement("p");

  if(className != null && className != undefined){
    p.className = className;
  }

  if(text != null && text != undefined){
    p.innerText = text;
  }

  return p;
}

DOMHelper.prototype.hidden = function(id){
  document.getElementById(id).style.visibility = "hidden";
}

DOMHelper.prototype.visible = function(id){
  document.getElementById(id).style.visibility = "visible";
}

DOMHelper.prototype.setClassName = function(elementId, className){
  document.getElementById(elementId).className = className;
}

DOMHelper.prototype.removeElementById = function(elementId){
  document.getElementById(elementId).parentNode.removeChild(document.getElementById(elementId));
}



DOMHelper.prototype.createModalWindowForFavourites = function(){
  let modalWindow = document.getElementById("favourites-modal");
  let modalBody = document.getElementById("modal-body");
  modalWindow.style.display = "block";

  let closeButton           = document.getElementById('button-close-modal-window');
  closeButton.addEventListener('click', function(){
    modalWindow.style.display = 'none';
  });

  document.addEventListener('click', function(){
    if(event.target === modalWindow){
      modalWindow.style.display = 'none';
    }
  });
}

DOMHelper.prototype.isCheckBoxChecked = function(checkBoxId){
  return document.getElementById(checkBoxId).checked;
}

DOMHelper.prototype.displayWelcomeMessage = function(){
  document.body.className = "welcome-message-main-container";

  let wordContainer = document.getElementById("welcome-word-container");
  wordContainer.className = "display-word-container";

  let message = "This is not a new place. This is not a new travel. ";
  message    += "This is YOUR NEXT EXPERIENCE.";
  arrayOfWords = message.split(" ");

  this.counter = 0;
  this.interval = setInterval(this.displayWelcomeWord.bind(this), 900);
}

DOMHelper.prototype.displayWelcomeWord = function(){

  let wordBox       = document.getElementById("word-span");
  wordBox.innerHTML = arrayOfWords[this.counter];

  if((arrayOfWords.length-1) === this.counter)
  {
    this.interval     = null;
    wordBox.className = "last-word";

    setTimeout(function(){
      let wordContainer = document.getElementById("welcome-word-container");
      wordContainer.className = "hide-word-container";
    }, 5000);

    document.body.className = "";
  }
  else
  {
    wordBox.className = "not-last-word";
    this.counter     += 1;
  }
}


module.exports = DOMHelper;
