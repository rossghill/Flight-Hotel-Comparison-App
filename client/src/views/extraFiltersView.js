const ExtraFiltersView = function(hotelFlightPackages){
  this.hotelFlightPackages = hotelFlightPackages;
}


ExtraFiltersView.prototype.createExtraFilters = function(){
  let div             = document.createElement("div");
  let divBudgetFilter = this.createBudgetFilter();
  div.appendChild(divBudgetFilter);
  return div;
}


ExtraFiltersView.prototype.createBudgetFilter = function(){

  // return `<div class="""slidecontainer">
  //         <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
  //         <p>Value: <span id="demo"></span></p>
  //         </div>`;

  let div     = document.createElement('div');
  let input   = document.createElement('input');
  input.type  = "range";
  input.type  = minPrice;
  input.type  = maxPrice;

  let div.appendChild(input);
  return div;
}


ExtraFiltersView.prototype.getExtraFilterValues = function(){


}






module.exports = ExtraFiltersView;
