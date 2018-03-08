const ExtraFiltersView = function(callBack){
  this.callBack = callBack;
}


ExtraFiltersView.prototype.createExtraFilters = function(minPrice, maxPrice){
  let divHookForExtraFilters  = document.getElementById("container-extra-filters");
  divHookForExtraFilters.innerHTML = "";

  let divBudgetFilter         = this.createBudgetFilter(minPrice, maxPrice);
  divHookForExtraFilters.appendChild(divBudgetFilter);

  let divHotelNameFilter      = this.createHotelNameFilter();
  divHookForExtraFilters.appendChild(divHotelNameFilter);
}


ExtraFiltersView.prototype.createBudgetFilter = function(minPrice, maxPrice){

  let div     = document.createElement('div');
  div.className = "flex-column";

  let input   = document.createElement('input');
  input.type  = "range";
  input.min   = minPrice;
  input.max   = maxPrice;
  input.value = maxPrice;
  input.classList.add("input-150");
  input.id    = "filter-budget";
  input.addEventListener("change", this.callBack);

  let label   = document.createElement("label")
  label.id    = "label-filter-budget";
  label.for   = "filter-budget";

  div.appendChild(label);
  div.appendChild(input);

  return div;
}

ExtraFiltersView.prototype.createHotelNameFilter = function(){
  let div               = document.createElement('div');
  div.className         = "flex-column";

  let label             = document.createElement("label")
  label.for             = "filter-hotelName";
  label.innerText       = "Hotel name"
  div.appendChild(label);

  let input             = document.createElement('input');
  input.type            = "text";
  input.classList.add("input-150");
  input.id              = "filter-hotelName";
  input.addEventListener("keyup", this.callBack);
  div.appendChild(input);

  return div;
}

ExtraFiltersView.prototype.updateCurrentBudgetLabel = function(){
  document.getElementById("label-filter-budget").innerText = "Budget £ " + Math.round(document.getElementById("filter-budget").value);
}


ExtraFiltersView.prototype.getExtraFilterValues = function(){
  let budgetMax = parseFloat(document.getElementById("filter-budget").value);
  let hotelName = document.getElementById("filter-hotelName").value;
  return  {budgetMax: budgetMax, hotelName: hotelName};
}






module.exports = ExtraFiltersView;
