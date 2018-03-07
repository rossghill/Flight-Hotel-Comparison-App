const DOMHelper = function(){


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
  if(size == 1)
  {
    select.style.position = "static";
  }
  else{
    select.style.position = "absolute";
  }
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







module.exports = DOMHelper;
