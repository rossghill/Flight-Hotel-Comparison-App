const ExtraFiltersView = function(){

}


ExtraFiltersView.prototype.createExtraFilters = function(hotelFlightPackages){
  let div             = document.createElement("div");
  let divBudgetFilter = this.createBudgetFilter();
  div.appendChild(divBudgetFilter);
  return div;
}


ExtraFiltersView.prototype.createBudgetFilter = function(){


}


ExtraFiltersView.prototype.getExtraFilterValues = function(){


}






module.exports = ExtraFiltersView;
