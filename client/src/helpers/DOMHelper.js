const DOMHelpers = function(){


}


DOMHelpers.prototype.createSelectOptions = function(selectId, arrayForOptions){
  const select = document.getElementById(selectId);
  select.options.length = 0;
  arrayForOptions.forEach(function(element){
    let option        = document.createElement("option");
    option.value      = element.value;
    option.innerText  = element.label;
    select.appendChild(option);
  });
}



DOMHelpers.prototype.addEventListenerOnChangeSelectOriginOrDestination = function(selectId, searchInputId){
  const select = document.getElementById(selectId);
  select.addEventListener("change", function(){
    this.setSelectSize(selectId, 1);
    document.getElementById(searchInputId).value = "";
  }.bind(this))

}

DOMHelpers.prototype.setSelectSize = function(selectId, size){
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












module.exports = DOMHelpers;
